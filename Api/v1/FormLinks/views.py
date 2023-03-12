from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny

from Api.base_views import MappedSerializerVMixin

from core.FormLinks.models import FormLinks
from .serializers import FormLinksSerializer


class FormLinksViewSet(viewsets.ReadOnlyModelViewSet, MappedSerializerVMixin):
    queryset = FormLinks.objects.filter(wait_for_delete=False).order_by('order_number')
    permission_classes = (AllowAny,)
    serializer_class = FormLinksSerializer

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ('label', 'link')
    ordering_fields = ('label', 'link')

    class Meta:
        model = FormLinks
