import json

from django.db import transaction
from django.urls import exceptions
from django_hosts import reverse

from core.FormLinks.models import FormLinks
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Load form links from json'

    @transaction.atomic
    def handle(self, *args, **options):
        filepath = 'core/FormLinks/fixtures/form_links.json'

        with open(filepath, 'r', encoding='utf-8') as file:
            data = json.load(file)

        FormLinks.objects.all().update(wait_for_delete=True)

        created_count = 0
        updated_count = 0
        went_error_count = 0
        for item in data:
            label = item.get('label')
            reverse_data = item.get('reverse')
            order_number = item.get('order_number')
            try:
                reverse(reverse_data, host='polls')
            except exceptions.NoReverseMatch:
                went_error_count += 1
                self.stdout.write(f'[!!!] Reverse for {reverse_data} not found', style_func=self.style.ERROR)
                continue

            form_link, created = FormLinks.objects.get_or_create(label=label, link=reverse_data)

            if created:
                created_count += 1
            else:
                updated_count += 1

            form_link.order_number = order_number
            form_link.wait_for_delete = False
            form_link.save()

        removed_count, _ = FormLinks.objects.filter(wait_for_delete=True).delete()
        self.stdout.write(f'[+] Created {created_count} form links', style_func=self.style.SUCCESS)
        self.stdout.write(f'[+] Updated {updated_count} form links', style_func=self.style.SUCCESS)
        self.stdout.write(f'[+] Removed {removed_count} form links', style_func=self.style.SUCCESS)
