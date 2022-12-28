from django.shortcuts import render
from django.db import models
from core.FormLinks.models import FormLinks
from core.ResponseCollector.models import ResponseCollector


def home_index(request):
    return render(request, 'Polls/index.html')


def new_year_poll(request):
    return render(request, 'Polls/polls/new_year_poll.html')
