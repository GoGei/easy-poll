ERROR_MESSAGES = {
    'required': 'Заполни это поле'
}

YES_NO_CHOICES = [
    (None, 'Выберите пожалуйста'),
    (True, 'Да'),
    (False, 'Нет')]


class BaseFieldMixin(object):
    @staticmethod
    def update_kwargs(self, **kwargs):
        raise NotImplementedError('Please, overwrite mixin rules of kwargs update')


class HiddenFieldMixin(BaseFieldMixin):
    @staticmethod
    def update_kwargs(self, **kwargs):
        self.hidden = kwargs.pop('hidden', False)
        self.hidden_attrs = {'type': 'hidden', 'style': 'display: none;', 'is_hidden': True}
        self.attrs = kwargs.get('attrs')

        if self.hidden:
            attrs = kwargs.get('attrs', {})
            attrs.update(self.hidden_attrs)
            kwargs['attrs'] = attrs

        return kwargs


class GeneralFieldMixin(HiddenFieldMixin):
    def update_kwargs(self, **kwargs):
        kwargs = HiddenFieldMixin.update_kwargs(self, **kwargs)
        return kwargs
