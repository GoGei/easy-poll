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
        fields = ['search', 'form_link', 'on_validation']


ERROR_MESSAGES = {
    'required': 'Заполни это поле'
}

YES_NO_CHOICES = [
    (None, 'Выберите пожалуйста'),
    (True, 'Да'),
    (False, 'Нет')]


class NewYearPoll_2022_2023_Form(forms.Form):
    trip = forms.CharField(max_length=128,
                           label='Как вы доехали?',
                           error_messages=ERROR_MESSAGES)
    greeted = forms.TypedChoiceField(choices=YES_NO_CHOICES,
                                     label='Вам понравилось как вас встретили?',
                                     coerce=bool,
                                     error_messages=ERROR_MESSAGES)
    want_sleep = forms.TypedChoiceField(choices=YES_NO_CHOICES,
                                        label='Вы хотели спать?',
                                        coerce=bool,
                                        error_messages=ERROR_MESSAGES)
    go_to_walk_after_meet = forms.TypedChoiceField(choices=YES_NO_CHOICES,
                                                   label='Вы пошли гулять после того, как вас встретили?',
                                                   coerce=bool,
                                                   error_messages=ERROR_MESSAGES)
    is_coffee_good = forms.TypedChoiceField(choices=YES_NO_CHOICES,
                                            label='Вам принесли вкусный кофе?',
                                            coerce=bool,
                                            error_messages=ERROR_MESSAGES)
    is_fed_well = forms.TypedChoiceField(choices=YES_NO_CHOICES,
                                         label='Вас хорошо накормили?',
                                         coerce=bool,
                                         error_messages=ERROR_MESSAGES)
    flowers = forms.TypedChoiceField(choices=YES_NO_CHOICES,
                                     label='Вам нравятся ваши цветы?',
                                     coerce=bool,
                                     error_messages=ERROR_MESSAGES)
    choose_shoes = forms.TypedChoiceField(choices=YES_NO_CHOICES,
                                          label='Вы выбрали обувь?',
                                          coerce=bool,
                                          error_messages=ERROR_MESSAGES)
    was_date = forms.TypedChoiceField(choices=YES_NO_CHOICES,
                                      label='Вы сходили на свидание?',
                                      coerce=bool,
                                      error_messages=ERROR_MESSAGES)
    date_comment = forms.CharField(widget=forms.Textarea,
                                   required=False,
                                   label='Ваш комментарий по свиданию',
                                   error_messages=ERROR_MESSAGES)
    gift_found = forms.TypedChoiceField(choices=YES_NO_CHOICES,
                                        label='Вы уже нашли ваш новогодний подарок?',
                                        coerce=bool,
                                        error_messages=ERROR_MESSAGES)
