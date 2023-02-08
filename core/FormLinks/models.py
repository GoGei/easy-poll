from django.db import models


class FormLinks(models.Model):
    label = models.CharField(max_length=128)
    link = models.URLField()
    wait_for_delete = models.BooleanField(default=False)

    class Meta:
        db_table = 'form_link'

    @classmethod
    def get_by_url(cls, rev_url):
        return cls.objects.get(link__iexact=rev_url)

    def __str__(self):
        return f'{self.label}'
