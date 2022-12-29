from django.db import models
from django.utils import timezone
from jsonfield import JSONField


class ResponseCollector(models.Model):
    created_stamp = models.DateTimeField(default=timezone.now, db_index=True)
    response = JSONField()
    is_send = models.BooleanField(default=False)

    class Meta:
        db_table = 'response_collector'

    @classmethod
    def create_from_response(cls, data):
        response = cls()
        response.response = data
        response.save()
        return response

    def __str__(self):
        return f'Response at {self.created_stamp}'

    def send(self):
        self.is_send = True
        self.save()
        return self
