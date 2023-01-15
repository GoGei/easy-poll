from django import forms

ERROR_MESSAGES = {
    'required': 'Заполни это поле'
}

YES_NO_CHOICES = [
    (None, 'Выберите пожалуйста'),
    (True, 'Да'),
    (False, 'Нет')]


class TextField(forms.CharField):
    def __init__(self, **kwargs):
        kwargs.setdefault('max_length', 128)
        super(TextField, self).__init__(**kwargs)


class TextAreaField(forms.CharField):
    def __init__(self, **kwargs):
        kwargs.setdefault('widget', forms.Textarea(kwargs.pop('attrs', {})))
        kwargs.setdefault('required', False)
        kwargs.setdefault('max_length', 1024)
        super(TextAreaField, self).__init__(**kwargs)


class ChoiceFields(forms.TypedChoiceField):
    def __init__(self, **kwargs):
        kwargs.setdefault('coerce', bool)
        super(ChoiceFields, self).__init__(**kwargs)


class YesNoChoiceField(ChoiceFields):
    def __init__(self, **kwargs):
        kwargs.setdefault('choices', YES_NO_CHOICES)
        super(YesNoChoiceField, self).__init__(**kwargs)


class MultipleChoiceField(forms.MultipleChoiceField):
    def __init__(self, **kwargs):
        choices = list(kwargs.pop('choices', []))
        choices = tuple(filter(lambda item: item[0] is not None, choices))
        kwargs.setdefault('choices', choices)

        attrs = kwargs.pop('attrs', {})
        attrs.update({'class': 'form-control select2',
                      'type': 'select',
                      'multiple': 'multiple'})

        kwargs.setdefault('widget', forms.SelectMultiple(attrs=attrs))
        super(MultipleChoiceField, self).__init__(**kwargs)
