from django.conf.urls import url
from . import views

urlpatterns = [
    url('^$', views.home_index, name='index'),
    url('^responses/$', views.home_responses, name='responses'),
    url(r'^responses/(?P<response_id>\d+)/$', views.response_view, name='response-view'),

    url('^new-year-poll-2022-2023/$', views.new_year_poll_2022_2023, name='new-year-poll-2022-2023'),
]
