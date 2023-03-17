from typing import Type, Dict
from django.shortcuts import render, redirect, reverse
from core.FormLinks.models import FormLinks
from core.ResponseCollector.models import ResponseCollector
from . import forms


def home_index(request):
    forms_links = FormLinks.objects.filter(wait_for_delete=False).order_by('order_number')
    return render(request, 'Polls/index.html', {'forms_links': forms_links})


def __base_view(request, form, html_to_render, form_data=Type[Dict]):
    """ General view to render and collect response """
    if '_cancel' in request.POST:
        return redirect(reverse('index'))

    url = request.path

    if not form_data:
        form_data = {}

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
    form.update(form_data)

    return render(request, html_to_render, {'form': form})


def new_year_poll_2022_2023(request):
    form = forms.NewYearPoll_2022_2023_Form
    template = 'Polls/polls/new_year_2022_2023_form.html'
    form_data = {
        'id': 'id_new_year_2022_2023_form'
    }
    return __base_view(request, form=form, html_to_render=template, form_data=form_data)


def after_new_year_poll_2022_2023(request):
    form = forms.AfterNewYearPoll_2022_2023_Form
    template = 'Polls/polls/after_new_year_2022_2023_form.html'
    form_data = {
        'id': 'id_after_new_year_2022_2023_form'
    }
    return __base_view(request, form=form, html_to_render=template, form_data=form_data)


def next_meet_preference(request):
    form = forms.NextTripPreferencesForm
    template = 'Polls/polls/next_trip_preference_form.html'
    form_data = {
        'id': 'id_next_trip_preference_form'
    }
    return __base_view(request, form=form, html_to_render=template, form_data=form_data)


def assassins_creed_3_game_pall(request):
    form = forms.AssassinsCreed3Form
    template = 'Polls/polls/assassins_creed_3_game_form.html'
    form_data = {
        'id': 'id_assassins_creed_3_game_form'
    }
    return __base_view(request, form=form, html_to_render=template, form_data=form_data)


def hell_neighbour_game_pall(request):
    form = forms.HellNeighbourForm
    template = 'Polls/polls/hell_neighbour_game_form.html'
    form_data = {
        'id': 'id_hell_neighbour_game_form'
    }
    return __base_view(request, form=form, html_to_render=template, form_data=form_data)


def saint_valentine_day_2023_pall(request):
    form = forms.SaintValentineDay2023Form
    template = 'Polls/polls/saint_valentine_day_2023_form.html'
    form_data = {
        'id': 'id_saint_valentine_day_2023_form'
    }
    return __base_view(request, form=form, html_to_render=template, form_data=form_data)


def other_poll_preferences_poll(request):
    form = forms.OtherPollPreferences
    template = 'Polls/polls/other_poll_preferences_form.html'
    form_data = {
        'id': 'id_other_poll_preferences_form'
    }
    return __base_view(request, form=form, html_to_render=template, form_data=form_data)


def after_meet_poll(request):
    form = forms.AfterMeetPoll
    template = 'Polls/polls/after_meet_poll_form.html'
    form_data = {
        'id': 'id_after_meet_poll_form'
    }
    return __base_view(request, form=form, html_to_render=template, form_data=form_data)


def in_progress_meet_poll(request):
    form = forms.InProgressMeetPoll
    template = 'Polls/polls/in_progress_meet_poll_form.html'
    form_data = {
        'id': 'id_in_progress_meet_poll_form'
    }
    return __base_view(request, form=form, html_to_render=template, form_data=form_data)
