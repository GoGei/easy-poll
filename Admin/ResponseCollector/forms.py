from core.ResponseCollector.models import ResponseCollector
from core.Utils.filtersets import BaseFilterForm


class ResponseFilterForm(BaseFilterForm):
    SEARCH_FIELDS = ['form_link__label']

    class Meta:
        model = ResponseCollector
        fields = ['search', 'form_link', 'on_validation']
