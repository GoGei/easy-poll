from django_hosts import patterns, host

host_patterns = patterns(
    '',
    host('', 'Polls.urls', name='polls'),
    # host('api', 'Api.urls', name='api'),
    host('admin', 'Admin.urls', name='admin'),
)
