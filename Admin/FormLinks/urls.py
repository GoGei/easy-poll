from django.urls import path

from . import views

urlpatterns = [
    path('', views.form_links_list, name='admin-form-links-list'),
    path('sync/', views.form_links_sync, name='admin-form-links-sync'),
    path('clear/', views.form_links_clear, name='admin-form-links-clear'),
    path('<int:form_link_id>/view/', views.form_links_view, name='admin-form-links-view'),
    path('<int:form_link_id>/increase/', views.form_links_switch_order, kwargs={'increase': True},
         name='admin-form-links-increase'),
    path('<int:form_link_id>/decrease/', views.form_links_switch_order, kwargs={'increase': False},
         name='admin-form-links-decrease'),
]
