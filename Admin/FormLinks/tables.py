import django_tables2 as tables
from core.FormLinks.models import FormLinks


class FormLinksTable(tables.Table):
    wait_for_delete = tables.BooleanColumn(orderable=False)
    actions = tables.TemplateColumn(template_name='Admin/FormLinks/form_links_actions_table_field.html',
                                    orderable=False)

    class Meta:
        model = FormLinks
        fields = ('pk', 'label', 'wait_for_delete', 'actions')
        template_name = "django_tables2/bootstrap4.html"
