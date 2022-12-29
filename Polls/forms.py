import django_filters
from django import forms
from django.db.models import Q
from core.ResponseCollector.models import ResponseCollector


class ResponseFilterForm(django_filters.FilterSet):
    SEARCH_FIELDS = ['form_link__label']
    search = django_filters.CharFilter(label='Search', method='search_qs',
                                       widget=forms.TextInput(attrs={'type': 'search'}))

    def search_qs(self, queryset, name, value):
        fields = self.SEARCH_FIELDS
        _filter = Q()
        for field in fields:
            _filter |= Q(**{f'{field}__icontains': value})
        queryset = queryset.filter(_filter)
        return queryset

    class Meta:
        model = ResponseCollector
        fields = ['search', 'form_link']


class NewYearPollForm(forms.Form):
    field_1 = forms.CharField(max_length=128)
    field_2 = forms.BooleanField(required=False)
    field_3 = forms.IntegerField()
    field_4 = forms.CharField(widget=forms.Textarea)
