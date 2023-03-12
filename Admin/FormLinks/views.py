from django.conf import settings
from django.contrib import messages
from django.core.management import call_command
from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from django_hosts import reverse
from rest_framework.renderers import JSONRenderer

from core.Utils.Access.decorators import manager_required
from core.FormLinks.models import FormLinks
from .tables import FormLinksTable
from .forms import FormLinksFilterForm, FormLinksImportForm


@manager_required
def form_links_list(request):
    form_links = FormLinks.objects.all().order_by('order_number')

    form_link_filter = FormLinksFilterForm(request.GET, queryset=form_links)
    form_links = form_link_filter.qs
    table_body = FormLinksTable(form_links)
    page = request.GET.get("page", 1)
    table_body.paginate(page=page, per_page=settings.ITEMS_PER_PAGE)

    table = {
        'title': 'Form Links Data Table',
        'body': table_body
    }
    table_filter = {
        'title': 'Form link filter',
        'body': form_link_filter,
        'action': reverse('admin-form-links-list', host='admin'),
    }

    return render(request, 'Admin/FormLinks/form_links_list.html',
                  {'table': table,
                   'filter': table_filter})


@manager_required
def form_links_sync(request):
    try:
        call_command('sync_form_links')
        messages.success(request, 'Links are synced')
    except Exception as e:
        messages.warning(request, 'Unable to sync links: %s' % str(e))
    return redirect(reverse('admin-form-links-list', host='admin'))


@manager_required
def form_links_clear(request):
    FormLinks.clear_previous()
    messages.success(request, 'Links are cleaned')
    return redirect(reverse('admin-form-links-list', host='admin'))


@manager_required
def form_links_view(request, form_link_id):
    form_link = get_object_or_404(FormLinks, pk=form_link_id)
    return render(request, 'Admin/FormLinks/form_links_view.html', {'form_link': form_link})


@manager_required
def form_links_switch_order(request, form_link_id, increase=None):
    form_link = get_object_or_404(FormLinks, pk=form_link_id)
    page = request.GET.get('page') or 1

    try:
        current, switched_with = form_link.switch_order_numbers(increase)
        messages.success(request, 'Form link order is switched %s <-> %s' % (current.label, switched_with.label))
    except ValueError as e:
        messages.warning(request, str(e))

    return redirect("%s?page=%s" % (reverse('admin-form-links-list', host='admin'), page))


@manager_required
def admin_form_links_import(request):
    if '_cancel' in request.POST:
        return redirect(reverse('admin-form-links-list', host='admin'))

    form_body = FormLinksImportForm(request.POST or None,
                                    request.FILES or None)

    if form_body.is_valid():
        try:
            form_body.save()
            messages.success(request, 'Form links have been imported successfully')
            return redirect(reverse('admin-form-links-list', host='admin'))
        except Exception as e:
            messages.warning(request, 'Form links can not be imported! Error: %s' % str(e))

    form = {'body': form_body,
            'buttons': {'save': True, 'cancel': True}}

    return render(request, 'Admin/FormLinks/form_links_import_form.html',
                  {'form': form})


@manager_required
def admin_form_links_export(request):
    data = FormLinks.get_data_to_export()
    content = JSONRenderer().render(data)

    response = HttpResponse(content, content_type='application/json')
    filename = 'form_links.json'
    response['Content-Disposition'] = 'attachment; filename=%s' % filename
    response['Cache-Control'] = 'no-cache'
    return response
