import json
import django_filters
from django import forms
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


class FormLinksImportForm(forms.Form):
    imported_file = forms.FileField(label='File',
                                    widget=forms.ClearableFileInput(attrs={'accept': '.json'}))

    def __init__(self, *args, **kwargs):
        super(FormLinksImportForm, self).__init__(*args, **kwargs)

    def clean(self):
        cleaned_data = self.cleaned_data
        _file = cleaned_data.get('imported_file')

        try:
            content = json.loads(_file.read())
        except (ValueError, AttributeError):
            raise forms.ValidationError('This is not valid JSON file')

        cleaned_data.update({'content': content})
        return cleaned_data

    def save(self):
        content = self.cleaned_data.get('content')
        FormLinks.import_from_data(content)
