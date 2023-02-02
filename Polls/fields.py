from django import forms
from .field_mixin import GeneralFieldMixin

ERROR_MESSAGES = {
    'required': 'Заполни это поле'
}

YES_NO_CHOICES = [
    (None, 'Выберите пожалуйста'),
    (True, 'Да'),
    (False, 'Нет')]


class TextField(forms.CharField, GeneralFieldMixin):
    def __init__(self, **kwargs):
        kwargs.setdefault('max_length', 128)
        super(TextField, self).__init__(**kwargs)


class TextAreaField(forms.CharField, GeneralFieldMixin):
    def __init__(self, **kwargs):
        kwargs = GeneralFieldMixin.update_kwargs(self, **kwargs)

        kwargs.setdefault('widget', forms.Textarea(kwargs.pop('attrs', {})))
        kwargs.setdefault('required', False)
        kwargs.setdefault('max_length', 1024)
        super(TextAreaField, self).__init__(**kwargs)


class ChoiceFields(forms.TypedChoiceField, GeneralFieldMixin):
    def __init__(self, **kwargs):
        kwargs = GeneralFieldMixin.update_kwargs(self, **kwargs)

        kwargs.setdefault('coerce', bool)
        super(ChoiceFields, self).__init__(**kwargs)


class YesNoChoiceField(ChoiceFields, GeneralFieldMixin):
    def __init__(self, **kwargs):
        kwargs = GeneralFieldMixin.update_kwargs(self, **kwargs)

        kwargs.setdefault('choices', YES_NO_CHOICES)
        super(YesNoChoiceField, self).__init__(**kwargs)


class MultipleChoiceField(forms.MultipleChoiceField, GeneralFieldMixin):
    def __init__(self, **kwargs):
        kwargs = GeneralFieldMixin.update_kwargs(self, **kwargs)

        choices = list(kwargs.pop('choices', []))
        choices = tuple(filter(lambda item: item[0] is not None, choices))
        kwargs.setdefault('choices', choices)

        attrs = kwargs.pop('attrs', {})
        attrs.update({'class': 'form-control select2',
                      'type': 'select',
                      'multiple': 'multiple'})

        kwargs.setdefault('widget', forms.SelectMultiple(attrs=attrs))
        super(MultipleChoiceField, self).__init__(**kwargs)


class DateField(forms.DateField, GeneralFieldMixin):
    def __init__(self, **kwargs):
        kwargs = GeneralFieldMixin.update_kwargs(self, **kwargs)

        attrs = kwargs.pop('attrs', {})
        attrs.update({'type': 'date'})
        kwargs.setdefault('widget', forms.DateInput(attrs=attrs))

        super(DateField, self).__init__(**kwargs)


class DateTimeField(forms.DateField, GeneralFieldMixin):
    def __init__(self, **kwargs):
        kwargs = GeneralFieldMixin.update_kwargs(self, **kwargs)

        attrs = kwargs.pop('attrs', {})
        attrs.update({'class': 'date'})
        kwargs.setdefault('widget', forms.DateTimeInput(attrs=attrs))

        super(DateTimeField, self).__init__(**kwargs)
