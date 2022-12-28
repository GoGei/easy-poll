from django.conf.urls import url
from . import views

urlpatterns = [
    url('^$', views.home_index, name='index'),
    url('^new-year-poll/$', views.new_year_poll, name='new-year-poll'),
]
