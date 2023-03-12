from rest_framework import serializers
from core.FormLinks.models import FormLinks


class FormLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormLinks
        fields = (
            'id',
            'label',
            'link',
        )
        read_only_fields = ('id',)
