from django.conf.urls import include, url

urlpatterns = [
    url('', include('urls')),
    url(r'^', include('Admin.Home.urls')),
    url(r'^', include('Admin.Login.urls')),
    url(r'^form-links/', include('Admin.FormLinks.urls')),
    url(r'^response-collectors/', include('Admin.ResponseCollector.urls')),
]
