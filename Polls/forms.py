from django import forms
from django.utils import timezone
from django_hosts import reverse

from core.FormLinks.models import FormLinks

from . import fields, base_forms


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


class NextTripPreferencesForm(forms.Form):
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


class AssassinsCreed3Form(base_forms.BaseGameForm):
    GAME_NAME = 'Assassins creed 3'


class HellNeighbourForm(base_forms.BaseGameForm):
    GAME_NAME = 'Как достать соседа'


class SaintValentineDay2023Form(forms.Form):
    ACTIVITIES = [
        ('watch_films', 'Смотреть фильмы'),
        ('walking', 'Гулять'),
        ('yoga', 'Йога'),
        ('play_games', 'Играть в игры'),
        ('go_to_date', 'Пойти на свидание'),
        ('cooking', 'Готовить'),
        ('travelling', 'Путешествовать'),
        ('lay_at_home', 'Валяться дома'),
        ('other_activities', 'Заниматься другими делами'),
    ]

    have_couple = fields.YesNoChoiceField(label='У вас есть пара на 14 февраля?')

    # on yes
    will_meet_each_other = fields.YesNoChoiceField(label='Вы встретитесь со своей парой?',
                                                   hidden=True)
    activities = fields.MultipleChoiceFieldWithCustomInput(label='Чем бы вы хотели заняться в этот день?',
                                                           choices=ACTIVITIES,
                                                           hidden=True,
                                                           )
    present_preferences = fields.TextField(label='Какой подарок вы бы хотели?',
                                           hidden=True)

    want_to_guess_your_present = fields.YesNoChoiceField(label='Хотели бы угадать свой подарок?',
                                                         hidden=True)
    your_guess = fields.TextField(label='Ваше предположение', hidden=True,
                                  attrs={'placeholder': 'Пробуйте угадать'})
    want_to_see_right_answer = fields.YesNoChoiceField(label='Показать правильный ответ?', hidden=True)
    right_answer = fields.TextField(label='Ваш подарок это:', hidden=True,
                                    attrs={
                                        'placeholder': 'Ага, так я тебе его и написал! Жди свой подарок )',
                                        'readonly': 'readonly'
                                    })

    # on no
    comment_on_dont_have_couple = fields.TextAreaField(label='Ваш комментарий', max_length=4096,
                                                       hidden=True,
                                                       attrs={'placeholder': 'А теперь я требую объяснений',
                                                              'cols': '40', 'rows': '5'})

    def clean(self):
        data = self.cleaned_data
        have_couple = data.get('have_couple', None)
        want_to_guess_your_present = data.get('want_to_guess_your_present', None)
        your_guess = data.get('your_guess', '')

        if have_couple is True:
            msg = 'Если ты думаешь, что ты выбрала "Да" и всё решила пропустить и оно проканает - ты ошибаешься'

            _fields = ('activities',)
            for field in _fields:
                if not data.get(field, None):
                    self.add_error(field, msg)

            _fields = ('will_meet_each_other',)
            for field in _fields:
                if data.get(field, None) is None:
                    self.add_error(field, msg)
        elif have_couple is False:
            _fields = ('comment_on_dont_have_couple',)
            msg = 'Тут вообще отвертеться не получится. Пиши давай'
            for field in _fields:
                if not data.get(field, None):
                    self.add_error(field, msg)

        if want_to_guess_your_present and not len(your_guess):
            self.add_error('your_guess', 'вот сама же выбрала, что хочешь угадать, но ниче не написала')

        return data


class OtherPollPreferences(forms.Form):
    AMOUNT_OF_QUESTIONS = [
        (None, 'Выберите пожалуйста'),
        (1, 'Очень мало (до 3)'),
        (2, 'Мало (3-5)'),
        (3, 'Средне (6-8)'),
        (4, 'Много (9-12)'),
        (5, 'Очень много (13+)')
    ]

    enjoy_polls = fields.YesNoChoiceField(label='Вам нравятся последние опросники, которые вы проходили?')
    poll_choices = fields.AjaxTypedMultipleChoiceField(label='Какие именно опросники вам понравились?',
                                                       coerce=FormLinks.objects.filter(wait_for_delete=False).all(),
                                                       data_url=reverse('api-v1:form-links-list', host='api'))
    preferable_amount_of_questions = fields.ChoiceFields(label='Сколько вопросов вас устраивает в опросниках?',
                                                         choices=AMOUNT_OF_QUESTIONS)
    change_requests = fields.TextAreaField(label='Ваши предпочтения по поводу опросников', max_length=4096,
                                           attrs={'rows': '5'})
    new_poll_themes = fields.TextAreaField(label='Какие бы вы хотели видеть опросники?', max_length=4096,
                                           attrs={'rows': '5'})


class AfterMeetPoll(forms.Form):
    arrive_date = fields.DateField(label='Когда вы приезжали?')
    departure_date = fields.DateField(label='Когда вы уехали?')

    enjoy_meal = fields.YesNoChoiceField(label='Вам нравится как вас кормят?')
    enjoy_treat = fields.YesNoChoiceField(label='Вам нравится как с вами обращаются?')
    has_enough_free_time = fields.YesNoChoiceField(label='Вам хватает свободного времени?')
    enjoy_free_time = fields.YesNoChoiceField(label='Вам нравится как вы проводите своё свободное время?')
    has_enough_busy_time = fields.YesNoChoiceField(label='Вам хватало вашего занятого времени?')
    enjoy_busy_time = fields.YesNoChoiceField(label='Вам нравится как вы проводите своё занятое время?')
    has_enough_devote_time = fields.YesNoChoiceField(label='Вам достаточно уделяли времени?')
    enjoy_devote_time = fields.YesNoChoiceField(label='Вам нравится то, как мы проводим с вами время?')
    has_seen_reply_on_yoga = fields.YesNoChoiceField(
        label='Вы уже видели мой комментарий по поводу "Студии йоги и красоты"?')
    has_enjoy_reply_on_yoga = fields.YesNoChoiceField(
        label='Вам понравился отзыв "Студии йоги и красоты"?')

    want_being_time_comment = fields.YesNoChoiceField(
        label='Хотите оставить комментарий по поводу вашего пребывания у меня?')
    being_time_comment = fields.TextAreaField(label='Комментарий вашего физического пребывания', hidden=True,
                                              attrs={'rows': 5})

    want_spend_time_comment = fields.YesNoChoiceField(
        label='Хотите оставить комментарий по поводу вашего времяпрепровождения?')
    spend_time_comment = fields.TextAreaField(label='Комментарий вашего морального пребывания', hidden=True,
                                              attrs={'rows': 5})

    want_yoga_comment = fields.YesNoChoiceField(
        label='Хотите оставить комментарий по поводу вашего йога-препровождения?')
    yoga_comment = fields.TextAreaField(label='Комментарий вашего йога-пребывания', hidden=True,
                                        attrs={'rows': 5})

    comment = fields.TextAreaField(label='Общий комментарий', attrs={'rows': 5})

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

            if arrive_date > today:
                msg = 'Да, давай, ПРИЕДЬ в будущем'
                self.add_error('arrive_date', msg)

            if departure_date > today:
                msg = 'Да, давай, УЕДЬ в будущем'
                self.add_error('departure_date', msg)

        comment_pairs = (
            ('want_being_time_comment', 'being_time_comment'),
            ('want_spend_time_comment', 'spend_time_comment'),
            ('want_yoga_comment', 'yoga_comment'),
        )

        for boolean_field, comment_field in comment_pairs:
            choice = data.get(boolean_field)
            comment = data.get(comment_field)
            if bool(choice) and not bool(comment):
                self.add_error(comment_field, 'Зачем тогда выбирала "Да"?')

        return data


class InProgressMeetPoll(forms.Form):
    THINGS_TO_DO = (
        ('walk', 'Гулять'),
        ('stay_home', 'Провести время дома'),
        ('play_games', 'Играть в игры'),
        ('watch_movies', 'Смотреть видео материалы для просмотра'),
        ('go_date', 'Сходить на свидание'),
        ('yoga', 'Заниматься йогой'),
        ('study', 'Учиться'),
    )
    PLACES_TO_GO = (
        ('katowice_center', 'Центр Катовице'),
        ('cafe', 'Кафе'),
        ('restaurant', 'Ресторан'),
        ('park', 'Парк'),
        ('cinema', 'Кино'),
        ('other_city', 'Другой город'),
        ('sushi', 'Суши'),
        ('bar', 'Бар'),
    )
    arrive_date = fields.DateField(label='Когда вы приехали?')
    departure_date = fields.DateField(label='Когда вы уедете?')

    enjoy_meet = fields.YesNoChoiceField(label='Вас устроило как вас встретили?')
    enjoy_food = fields.YesNoChoiceField(label='Вас устроило как вас кормят?')
    enjoy_food_you_cooked = fields.YesNoChoiceField(
        label='Вас готовили что-то мне? (Там было "Вы", но так даже забавлее)')

    devote_enough_time = fields.YesNoChoiceField(label='Вам уделяли достаточно времени?')
    time_change_request = fields.TextAreaField(label='Что бы вы хотели поменять в проведении своего времени?')

    want_things_to_do = fields.MultipleChoiceFieldWithCustomInput(label='Чем бы вы хотели заняться?',
                                                                  choices=THINGS_TO_DO)

    enjoy_movies = fields.YesNoChoiceField(label='Вам понравились подобранные вам видео материалы для просмотра?')
    movies_comment = fields.TextAreaField(label='Комментарий о подобранных вам видео материалах?')

    places_to_go = fields.MultipleChoiceFieldWithCustomInput(label='Куда бы вы хотели сходить?',
                                                             choices=PLACES_TO_GO)

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

            if arrive_date >= today:
                msg = 'Да, давай, ПРИЕДЬ в будущем'
                self.add_error('arrive_date', msg)

            if departure_date <= today:
                msg = 'Да, давай, УЕДЬ в прошлом'
                self.add_error('departure_date', msg)

        return data
