from django import forms
from django.core.exceptions import ValidationError
from .field_mixin import GeneralFieldMixin

ERROR_MESSAGES = {
    'required': 'Заполни это поле'
}

YES_NO_CHOICES = [
    (None, 'Выберите пожалуйста'),
    (True, 'Да'),
    (False, 'Нет')
]


class TextField(forms.CharField, GeneralFieldMixin):
    def __init__(self, **kwargs):
        kwargs = GeneralFieldMixin.update_kwargs(self, **kwargs)

        attrs = kwargs.pop('attrs', {})
        attrs.setdefault('placeholder', 'Оставьте ваш текст')

        kwargs.setdefault('max_length', 128)
        kwargs.setdefault('widget', forms.TextInput(attrs))
        super(TextField, self).__init__(**kwargs)


class TextAreaField(forms.CharField, GeneralFieldMixin):
    def __init__(self, **kwargs):
        kwargs = GeneralFieldMixin.update_kwargs(self, **kwargs)

        attrs = kwargs.pop('attrs', {})
        attrs.setdefault('placeholder', 'Тут могла быть ваша реклама')

        kwargs.setdefault('required', False)
        kwargs.setdefault('max_length', 1024)
        kwargs.setdefault('widget', forms.Textarea(attrs))
        super(TextAreaField, self).__init__(**kwargs)


class ChoiceFields(forms.TypedChoiceField, GeneralFieldMixin):
    def __init__(self, **kwargs):
        kwargs = GeneralFieldMixin.update_kwargs(self, **kwargs)

        kwargs.setdefault('widget', forms.Select(kwargs.pop('attrs', {})))
        super(ChoiceFields, self).__init__(**kwargs)


class YesNoChoiceField(ChoiceFields, GeneralFieldMixin):
    def __init__(self, **kwargs):
        kwargs = GeneralFieldMixin.update_kwargs(self, **kwargs)

        kwargs.setdefault('coerce', lambda x: x == 'True')
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


class MultipleChoiceFieldWithCustomInput(forms.CharField, GeneralFieldMixin):
    """ Class that provide multiple select with add custom options integrated with select2 """

    def __init__(self, **kwargs):
        kwargs = GeneralFieldMixin.update_kwargs(self, **kwargs)

        attrs = kwargs.pop('attrs', {})
        choices = kwargs.pop('choices', [])
        # transform data to select2 data format
        choices = [{'id': item[0], 'text': item[1]} for item in choices]
        attrs.update({
            'class': 'form-control select2',
            'data-select-2-config': {
                'placeholder': 'Тут можно не только выбирать имеющиеся, но и указывать свои',
                'multiple': 'multiple',
                'tags': 'true',
                'width': '100%',
                'data': choices
            }
        })

        kwargs.setdefault('max_length', 1024)
        kwargs.setdefault('widget', forms.SelectMultiple(attrs))

        super(MultipleChoiceFieldWithCustomInput, self).__init__(**kwargs)

    def to_python(self, value):
        if not value:
            return []
        elif not isinstance(value, (list, tuple)):
            raise ValidationError(self.error_messages['invalid_list'], code='invalid_list')
        return [str(val) for val in value]

    def validate(self, value):
        """Validate that the input is a list or tuple."""
        if self.required and not value:
            raise ValidationError(self.error_messages['required'], code='required')


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


class AjaxChoiceFieldMixin(GeneralFieldMixin):
    def __init__(self, **kwargs):
        kwargs = GeneralFieldMixin.update_kwargs(self, **kwargs)

        data_url = kwargs.pop('data_url')
        attrs = kwargs.get('attrs', {})
        attrs.update({'data-ajax-url': data_url,
                      'data-placeholder': attrs.get('placeholder', 'Выбери варианты')
                      })
        kwargs['attrs'] = attrs
        super(AjaxChoiceFieldMixin, self).__init__(**kwargs)


class AjaxTypedChoiceFieldMixin(AjaxChoiceFieldMixin):
    def __init__(self, **kwargs):
        kwargs = GeneralFieldMixin.update_kwargs(self, **kwargs)

        coerce = kwargs.pop('coerce', {})
        choices = [(item.pk, item.label) for item in coerce]
        kwargs['choices'] = choices

        super(AjaxTypedChoiceFieldMixin, self).__init__(**kwargs)


class AjaxChoiceField(AjaxChoiceFieldMixin, ChoiceFields):
    pass


class AjaxTypedChoiceField(AjaxTypedChoiceFieldMixin, ChoiceFields):
    pass


class AjaxMultipleChoiceField(AjaxChoiceFieldMixin, MultipleChoiceField):
    pass


class AjaxTypedMultipleChoiceField(AjaxTypedChoiceFieldMixin, MultipleChoiceField):
    pass
