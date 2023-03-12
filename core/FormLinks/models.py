from typing import List

from django.db import models
from django_hosts import reverse
from core.ResponseCollector.models import ResponseCollector
from core.Utils.Mixins.models import ExportToJSONMixin, OrderableMixin


class FormLinks(ExportToJSONMixin, OrderableMixin):
    label = models.CharField(max_length=128)
    link = models.CharField(max_length=128)
    wait_for_delete = models.BooleanField(default=False)

    class Meta:
        db_table = 'form_link'

    @classmethod
    def get_by_url(cls, rev_url):
        rev_url = rev_url.replace('/', '')
        return cls.objects.get(link__iexact=rev_url)

    def __str__(self):
        return f'{self.label}'

    @property
    def absolute_url(self):
        return reverse(self.link, host='polls')

    # export to json methods
    @classmethod
    def set_as_default(cls, obj):
        raise NotImplementedError

    @classmethod
    def get_fields_to_export(cls) -> List[str]:
        return ['label', 'link', 'wait_for_delete', 'order_number']

    @classmethod
    def get_fields_on_get_or_create(cls) -> List[str]:
        return ['label', 'link']

    @classmethod
    def get_extra_fields_on_import(cls) -> List[str]:
        return ['wait_for_delete', 'order_number']

    @classmethod
    def validate_before_import(cls, data):
        cls.check_unique(data, 'order_number')

    @classmethod
    def clear_previous(cls):
        ResponseCollector.objects.all().delete()
        cls.objects.all().delete()
