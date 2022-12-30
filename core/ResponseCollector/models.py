import smtplib

from jsonfield import JSONField
from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.mail import send_mail
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from core.FormLinks.models import FormLinks


class ResponseCollector(models.Model):
    TEMPLATE = 'core_templates/response_message.html'

    created_stamp = models.DateTimeField(default=timezone.now, db_index=True)
    form_link = models.ForeignKey('FormLinks.FormLinks', on_delete=models.PROTECT)
    response = JSONField()
    is_send = models.BooleanField(default=False)
    on_validation = models.BooleanField(default=False)

    class Meta:
        db_table = 'response_collector'

    @classmethod
    def create_from_response(cls, data, form_link, **kwargs):
        response = cls(**kwargs)
        response.response = data
        response.form_link = FormLinks.get_by_url(form_link)
        response.save()
        return response

    def __str__(self):
        return f'Response at {self.created_stamp}'

    def prepared_html_message(self):
        base_template = self.TEMPLATE
        context = {'response': self}

        html_message = render_to_string(base_template, context)
        return html_message

    def prepared_plain_message(self):
        html_message = self.prepared_html_message()
        plain_message = strip_tags(html_message)
        return plain_message

    def send(self):
        html_message = self.prepared_html_message()
        plain_message = self.prepared_plain_message()

        subject = 'Response!'
        sender = settings.DEFAULT_FROM_EMAIL
        recipients = [settings.RECIPIENT]

        try:
            send_mail(subject, plain_message, sender, recipients, html_message=html_message)
            self.is_send = True
            self.save()
        except smtplib.SMTPAuthenticationError:
            pass

        return self
