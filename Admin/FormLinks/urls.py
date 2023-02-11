from django.urls import path

from . import views

urlpatterns = [
    path('', views.form_links_list, name='admin-form-links-list'),
    path('sync/', views.form_links_sync, name='admin-form-links-sync'),
    path('<int:form_link_id>/view/$', views.form_links_view, name='admin-form-links-view'),
]
