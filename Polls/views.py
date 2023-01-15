import json

from django.conf import settings
from django.shortcuts import render, redirect, reverse, get_object_or_404
from core.FormLinks.models import FormLinks
from core.ResponseCollector.models import ResponseCollector
from . import forms
from .tables import ResponseTable


def home_index(request):
    forms_links = FormLinks.objects.filter(wait_for_delete=False).order_by('-label')
    return render(request, 'Polls/index.html', {'forms_links': forms_links})


def home_responses(request):
    responses = ResponseCollector.objects.select_related('form_link').all().order_by('-created_stamp')

    response_filter = forms.ResponseFilterForm(request.GET, queryset=responses)
    responses = response_filter.qs
    table_body = ResponseTable(responses)
    page = request.GET.get("page", 1)
    table_body.paginate(page=page, per_page=settings.ITEMS_PER_PAGE)

    table = {
        'title': 'Response Table',
        'body': table_body
    }
    table_filter = {
        'title': 'Responses',
        'body': response_filter,
        'action': reverse('responses'),
    }

    return render(request, 'Polls/responses.html',
                  {'table': table,
                   'filter': table_filter}
                  )


def response_view(request, response_id):
    response = get_object_or_404(ResponseCollector, pk=response_id)
    json_data = json.dumps(response.response, indent=3, ensure_ascii=False)

    return render(request, 'Polls/responses/view.html',
                  {'response': response,
                   'json_data': json_data})


def __base_view(request, form, html_to_render):
    """ General view to render and collect response """
    if '_cancel' in request.POST:
        return redirect(reverse('index'))

    url = request.path

    form_body = form(request.POST or None)
    if form_body.is_valid():
        response = ResponseCollector.create_from_response(data=form_body.cleaned_data,
                                                          form_link=url)
        response = response.send()
        if response.is_send:
            return render(request, 'Polls/success.html', {'response': response})
        else:
            return render(request, 'Polls/error.html', {'response': response})
    elif form_body.is_valid() and request.method == 'POST':
        response = ResponseCollector.create_from_response(data=form_body.cleaned_data,
                                                          form_link=url,
                                                          on_validation=True)
        response.send()

    form = {
        'title': FormLinks.get_by_url(url).label,
        'body': form_body,
        'buttons': {'save': True, 'cancel': True},
    }

    return render(request, html_to_render, {'form': form})


def new_year_poll_2022_2023(request):
    form = forms.NewYearPoll_2022_2023_Form
    template = 'Polls/polls/new_year_2022_2023_form.html'
    return __base_view(request, form=form, html_to_render=template)


def after_new_year_poll_2022_2023(request):
    form = forms.AfterNewYearPoll_2022_2023_Form
    template = 'Polls/polls/after_new_year_2022_2023_form.html'
    return __base_view(request, form=form, html_to_render=template)
