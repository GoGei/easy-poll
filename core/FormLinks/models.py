from django.db import models


class FormLinks(models.Model):
    label = models.CharField(max_length=128)
    link = models.URLField()
    wait_for_delete = models.BooleanField(default=False)

    class Meta:
        db_table = 'form_link'

    def __str__(self):
        return f'{self.label}'
