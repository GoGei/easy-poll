import django_tables2 as tables
from core.ResponseCollector.models import ResponseCollector


class ResponseTable(tables.Table):
    form_link = tables.TemplateColumn(template_name='Polls/responses/form_link_field.html', orderable=False)
    created_stamp = tables.DateTimeColumn(orderable=True)
    is_send = tables.BooleanColumn(orderable=True)
    on_validation = tables.BooleanColumn(orderable=True)
    actions = tables.TemplateColumn(template_name='Polls/responses/response_actions.html', orderable=False)

    class Meta:
        model = ResponseCollector
        fields = ('created_stamp', 'form_link', 'is_send', 'on_validation', 'actions')
        template_name = "django_tables2/bootstrap4.html"
