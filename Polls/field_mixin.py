ERROR_MESSAGES = {
    'required': 'Заполни это поле'
}

YES_NO_CHOICES = [
    (None, 'Выберите пожалуйста'),
    (True, 'Да'),
    (False, 'Нет')]


class BaseFieldMixin(object):
    def update_kwargs(self, **kwargs):
        kwargs.update({'error_messages': ERROR_MESSAGES})
        return kwargs


class HiddenFieldMixin(BaseFieldMixin):
    # HIDDEN_ARGS = {'type': 'hidden', 'style': 'display: none;', 'is_hidden': True}
    HIDDEN_ARGS = {'style': 'display: none;', 'is_hidden': True}

    def update_kwargs(self, **kwargs):
        kwargs = super(HiddenFieldMixin, self).update_kwargs(**kwargs)
        self.hidden = kwargs.pop('hidden', False)
        self.attrs = kwargs.get('attrs')

        if self.hidden:
            attrs = kwargs.get('attrs', {})
            attrs.update(self.HIDDEN_ARGS)
            kwargs['attrs'] = attrs
            kwargs.setdefault('required', False)

        return kwargs


class GeneralFieldMixin(HiddenFieldMixin):
    def update_kwargs(self, **kwargs):
        kwargs = HiddenFieldMixin.update_kwargs(self, **kwargs)
        return kwargs
