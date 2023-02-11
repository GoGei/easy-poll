import json
from django.conf import settings
from django.shortcuts import render, get_object_or_404
from django_hosts import reverse

from core.Utils.Access.decorators import manager_required
from core.ResponseCollector.models import ResponseCollector
from .tables import ResponseTable
from .forms import ResponseFilterForm


@manager_required
def responses_list(request):
    responses = ResponseCollector.objects.select_related('form_link').all().order_by('-created_stamp')

    response_filter = ResponseFilterForm(request.GET, queryset=responses)
    responses = response_filter.qs
    table_body = ResponseTable(responses)
    page = request.GET.get("page", 1)
    table_body.paginate(page=page, per_page=settings.ITEMS_PER_PAGE)

    table = {
        'title': 'Response Table',
        'body': table_body
    }
    table_filter = {
        'title': 'Responses',
        'body': response_filter,
        'action': reverse('admin-responses-list', host='admin'),
    }

    return render(request, 'Admin/ResponseCollector/responses_list.html',
                  {'table': table,
                   'filter': table_filter})


@manager_required
def response_view(request, response_id):
    response = get_object_or_404(ResponseCollector, pk=response_id)
    json_data = json.dumps(response.response, indent=3, ensure_ascii=False)
    return render(request, 'Admin/ResponseCollector/responses_view.html',
                  {'response': response,
                   'json_data': json_data}
                  )
