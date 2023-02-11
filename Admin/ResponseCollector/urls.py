from django.urls import path

from . import views

urlpatterns = [
    path('', views.responses_list, name='admin-responses-list'),
    path('<int:response_id>/view/$', views.response_view, name='admin-responses-view'),
]
