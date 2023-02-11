import django_filters

from core.Utils.filtersets import BaseFilterForm
from core.FormLinks.models import FormLinks


class FormLinksFilterForm(BaseFilterForm):
    BASE_FILTER_FIELDS = ['search', 'wait_for_delete']
    SEARCH_FIELDS = ['label', 'link']

    wait_for_delete = django_filters.ChoiceFilter(label='On delete', empty_label='Not selected',
                                                  method='wait_for_delete_filter',
                                                  choices=[('true', 'To delete'), ('false', 'Not delete')])

    def wait_for_delete_filter(self, queryset, name, value):
        if value == 'true':
            queryset = queryset.filter(wait_for_delete=True)
        elif value == 'false':
            queryset = queryset.filter(wait_for_delete=False)
        return queryset

    class Meta:
        model = FormLinks
        fields = ['search', 'wait_for_delete']
