from django.shortcuts import render, redirect, reverse
from core.FormLinks.models import FormLinks
from core.ResponseCollector.models import ResponseCollector
from . import forms


def home_index(request):
    forms_links = FormLinks.objects.all().order_by('label')
    return render(request, 'Polls/index.html', {'forms_links': forms_links})


def new_year_poll(request):
    if '_cancel' in request.POST:
        return redirect(reverse('index'))

    form_body = forms.NewYearPollForm(request.POST or None)
    if form_body.is_valid():
        response = ResponseCollector.create_from_response(form_body.cleaned_data)
        response.send()
        return render(request, 'Polls/success.html', {'response': response})

    form = {
        'body': form_body,
        'buttons': {'save': True, 'cancel': True},
    }

    return render(request, 'Polls/polls/new_year_poll.html', {'form': form})
