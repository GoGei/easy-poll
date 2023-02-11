from typing import List, Dict

from django.db import models
from django_hosts import reverse
from core.ResponseCollector.models import ResponseCollector
from core.Utils.Mixins.models import OrderableMixin, ExportableMixin


class FormLinks(OrderableMixin, ExportableMixin):
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

    @classmethod
    def clear(cls):
        ResponseCollector.objects.all().delete()
        cls.objects.all().delete()

    @classmethod
    def get_data_to_export(cls) -> List[Dict]:
        data = [
            {
                'label': item.label,
                'link': item.link,
                'wait_for_delete': item.wait_for_delete,
                'order_number': item.order_number,
            } for item in cls.objects.all()
        ]
        return data

    @classmethod
    def import_data(cls, data):
        for item in data:
            obj = cls.objects.filter(label=item.get('label'),
                                     link=item.get('link')).first()
            if not obj:
                obj = cls(label=item.get('label'),
                          link=item.get('link'))
            obj.wait_for_delete = item.get('wait_for_delete')
            obj.order_number = item.get('order_number')
            obj.save()

    @classmethod
    def clear_previous(cls):
        cls.clear()
