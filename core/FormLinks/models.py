from django.db import models
from django_hosts import reverse
from core.ResponseCollector.models import ResponseCollector
from core.Utils.Mixins.models import OrderableMixin


class FormLinks(OrderableMixin):
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
