import django_filters
from django import forms
from django.db.models import Q
from django.utils import timezone

from core.ResponseCollector.models import ResponseCollector
from . import fields


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


class NewYearPoll_2022_2023_Form(forms.Form):
    trip = fields.TextField(label='Как вы доехали?')
    greeted = fields.YesNoChoiceField(label='Вам понравилось как вас встретили?')
    want_sleep = fields.YesNoChoiceField(label='Вы хотели спать?')
    go_to_walk_after_meet = fields.YesNoChoiceField(label='Вы пошли гулять после того, как вас встретили?')
    is_coffee_good = fields.YesNoChoiceField(label='Вам принесли вкусный кофе?')
    is_fed_well = fields.YesNoChoiceField(label='Вас хорошо накормили?')
    flowers = fields.YesNoChoiceField(label='Вам нравятся ваши цветы?')
    choose_shoes = fields.YesNoChoiceField(label='Вы выбрали обувь?')
    was_date = fields.YesNoChoiceField(label='Вы сходили на свидание?')
    date_comment = fields.TextAreaField(label='Ваш комментарий по свиданию')
    gift_found = fields.YesNoChoiceField(label='Вы уже нашли ваш новогодний подарок?')


class AfterNewYearPoll_2022_2023_Form(forms.Form):
    WATCHED_FILMS = [
        ('bruno', 'Бруно'),
        ('wednesday', 'Уэнсдэй'),
        ('my_boyfriend_from_zoo', 'Мой парень из зоопарка'),
        ('how_i_met_your_mom', 'Как я встретил вашу маму'),
    ]
    SALADS = [
        ('olivie', 'Оливье'),
        ('green_salad', 'Салат из зелени'),
        ('mimosa', 'Мимоза'),
        ('chicken_pineapple', 'Салат с курицей и ананасами и др. ингредиентами'),
    ]
    LOOK_AT_CHOICES = [
        (None, 'Выберите пожалуйста'),
        (1, 'Не смотрела'),
        (2, 'Не часто'),
        (3, 'Обращала внимание'),
        (4, 'Часто'),
        (5, 'Смотрела постоянно')
    ]
    MASSAGE_RATE_CHOICES = [
        (None, 'Выберите пожалуйста'),
        (1, 'Плохо'),
        (2, 'Не очень'),
        (3, 'Нормально'),
        (4, 'Хорошо'),
        (5, 'Отлично')
    ]

    is_enjoy_your_time = fields.YesNoChoiceField(label='Вам понравилось как вы провели время?')
    is_you_like_way_treated = fields.YesNoChoiceField(label='Вам понравилось как с вами обращались?')
    comment_on_treated = fields.TextAreaField(
        label='Оставьте ваш комментарий по поводу того, как с вами обращались', max_length=4096, hidden=True)
    is_like_movies_generally = fields.YesNoChoiceField(label='Вам понравились фильмы, которые вы смотрели в целом?')
    liked_films = fields.MultipleChoiceField(label='Выберите, какие понравились', choices=WATCHED_FILMS)
    disliked_films = fields.MultipleChoiceField(label='Выберите, какие не понравились', choices=WATCHED_FILMS)
    help_in_signature_salad = fields.YesNoChoiceField(
        label='Вам достаточно хорошо помогли в приготовлении вашего фирменного невероятного салата?')
    enjoy_other_salads = fields.YesNoChoiceField(
        label='Вам понравились салаты, которые была приготовлены на новый год?')
    enjoyed_salads = fields.MultipleChoiceField(
        label='Выберите какие салаты вам понравились', choices=SALADS)
    is_enjoyed_date = fields.YesNoChoiceField(label='Вам понравилось ваше свидание?')
    is_enjoyed_date_meal = fields.YesNoChoiceField(label='Вам понравилось блюдо, которое вы выбрали?')
    is_enjoyed_date_selected_pizza = fields.YesNoChoiceField(label='Вам понравилась пицца, которую вам выбрали?')
    is_enjoyed_waitress_smile = fields.YesNoChoiceField(
        label='Вам понравилась официантка с красивой улыбкой (огромныни сиськами)?')
    how_often_looked_at_her = fields.ChoiceFields(label='Как часто вы смотрели на неё?', choices=LOOK_AT_CHOICES)
    how_ofter_looked_at_me_to_see_my_reaction = fields.ChoiceFields(
        label='Как часто вы смотрели на меня пытаясь понять как часто я смотрю на неё?', choices=LOOK_AT_CHOICES)
    massage_sessions = fields.YesNoChoiceField(label='Вам понравилось как прошли ваши сеансы массажа и йоги?')
    massage_sessions_rate = fields.ChoiceFields(label='Оцените как сильно вам понравились ваши сеансы обновления?',
                                                choices=MASSAGE_RATE_CHOICES)
    were_mandarins_good = fields.YesNoChoiceField(label='Вкусные ли были мандарины?')
    were_enough_mandarins = fields.YesNoChoiceField(label='Было ли достаточно мандаринов?')
    were_walks_warm = fields.YesNoChoiceField(label='Вам было тепло гулять в городе?')
    were_games_good = fields.YesNoChoiceField(label='Вам понравились скачанные для вас игры?')
    comment = fields.TextAreaField(label='Оставьте ваш комментарий по поводу нового года', max_length=4096)

    def clean(self):
        data = self.cleaned_data

        liked_films = data.get('liked_films', [])
        disliked_films = data.get('disliked_films', [])

        if any(film in disliked_films for film in liked_films):
            msg = 'Я же написал, нельзя указывать одинаковые фильмы и там и там!'
            self.add_error('liked_films', msg)
            self.add_error('disliked_films', msg)

        return data


class NextTripPreferences(forms.Form):
    RATE_CHOICES = [
        (None, 'Выберите пожалуйста'),
        (1, 'Совсем не хочу'),
        (2, 'Не хочу'),
        (3, 'Средне'),
        (4, 'Хочу'),
        (5, 'Очень хочу')
    ]

    arrive_date = fields.DateField(label='Когда вы приезжаете?')
    departure_date = fields.DateField(label='Когда вы уезжаете?')

    already_bought_tickets = fields.YesNoChoiceField(label='Вы уже купили билет?')
    new_dress_up = fields.YesNoChoiceField(label='Вы привезёте с собой новый "стил хиз лук"?')

    walking_preference = fields.ChoiceFields(label='Оцените ваше желание гулять', choices=RATE_CHOICES)
    walking_preference_comment = fields.TextAreaField(label='Оставьте ваш комментарий', max_length=1024,
                                                      hidden=True)

    watch_films_preference = fields.ChoiceFields(
        label='Оцените ваше желание смотреть шедевры кинематографа и другой чуши?', choices=RATE_CHOICES)
    watch_films_preference_comment = fields.TextAreaField(label='Оставьте ваш комментарий', max_length=1024,
                                                          hidden=True)

    just_stay_at_home = fields.ChoiceFields(label='Оцените ваше желание просто побыть дома', choices=RATE_CHOICES)
    just_stay_at_home_comment = fields.TextAreaField(label='Оставьте ваш комментарий', max_length=1024,
                                                     hidden=True)

    want_to_try_smth_new = fields.ChoiceFields(label='Оцените ваше желание попробовать что-то новое',
                                               choices=RATE_CHOICES)
    want_to_try_smth_new_comment = fields.TextAreaField(label='Оставьте ваш комментарий', max_length=1024,
                                                        hidden=True)

    general_comment = fields.TextAreaField(label='Поле для общего комментария', max_length=4096)

    def clean(self):
        data = self.cleaned_data
        today = timezone.now().date()

        arrive_date = data.get('arrive_date')
        departure_date = data.get('departure_date')

        if arrive_date and departure_date:
            if arrive_date > departure_date:
                msg = 'Да, давай, ПРИЕДЬ раньше, чем УЕДЬ'
                self.add_error('arrive_date', msg)
                self.add_error('departure_date', msg)

            if arrive_date < today:
                msg = 'Да, давай, ПРИЕДЬ в прошлом'
                self.add_error('arrive_date', msg)

            if departure_date < today:
                msg = 'Да, давай, УЕДЬ в прошлом'
                self.add_error('departure_date', msg)

        return data
