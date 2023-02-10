from django import forms
from . import fields


class BaseGameForm(forms.Form):
    GAME_NAME = 'Default game name'
    RATE_CHOICES = (
        (None, 'Оцените игру'),
        (1, 'Совсем не понравилась'),
        (2, 'Не понравилась'),
        (3, 'Понравилась'),
        (4, 'Очень понравилась'),
        (5, 'Превзошла ожидания'),
    )

    GAME_ASPECT = (
        ('game_play', 'Геймплей'),
        ('story', 'Сюжет'),
        ('fight', 'Боёвка'),
        ('graphics', 'Графика'),
        ('controlling', 'Управление'),
    )

    game_enjoyed = fields.YesNoChoiceField(label='Вам понравилась игра "{game_name}"?')
    comment_on_yes_enjoy = fields.TextAreaField(label='Что именно вам понравилось?', max_length=1024, hidden=True)
    comment_on_not_enjoy = fields.TextAreaField(label='Что именно вам не понравилось?', max_length=1024, hidden=True)
    game_enjoyed_rate = fields.ChoiceFields(label='Насколько сильно вам понравилась игра?', choices=RATE_CHOICES)
    liked_aspects = fields.MultipleChoiceField(label='Аспекты, которые вам понравились', choices=GAME_ASPECT)
    disliked_aspects = fields.MultipleChoiceField(label='Аспекты, которые вам не понравились', choices=GAME_ASPECT)
    enjoyed_to_play = fields.YesNoChoiceField(label='Вам понравилось играть в "{game_name}"')
    enjoyed_to_watch = fields.YesNoChoiceField(label='Вам понравилось смотреть как играют в "{game_name}"')
    want_to_play_smth_similar = fields.YesNoChoiceField(label='Хотели бы сыграть во что-то похожее?')
    comment_on_want_to_play_smth_similar = fields.TextAreaField(label='Во что например?', max_length=1024, hidden=True)
    comment = fields.TextAreaField(label='Оставьте ваш комментарий', max_length=4096)

    def __init__(self, *args, **kwargs):
        super(BaseGameForm, self).__init__(*args, **kwargs)
        _fields = self.fields
        for field in _fields:
            current_field = _fields[field]
            if "game_name" in current_field.label:
                current_field.label = current_field.label.format(game_name=self.GAME_NAME)

    def clean(self):
        data = self.cleaned_data

        liked_aspects = data.get('liked_aspects', [])
        disliked_aspects = data.get('disliked_aspects', [])

        if any(film in disliked_aspects for film in liked_aspects):
            msg = 'Давай, укажи один и тот же аспект И ТАМ И ТАМ!'
            self.add_error('liked_aspects', msg)
            self.add_error('disliked_aspects', msg)

        return data
