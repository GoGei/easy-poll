from django.conf import settings
from django.contrib import messages
from django.core.management import call_command
from django.shortcuts import render, redirect, get_object_or_404
from django_hosts import reverse

from core.Utils.Access.decorators import manager_required
from core.FormLinks.models import FormLinks
from .tables import FormLinksTable
from .forms import FormLinksFilterForm


@manager_required
def form_links_list(request):
    form_links = FormLinks.objects.all().order_by('label')

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
    FormLinks.objects.all().delete()
    messages.success(request, 'Links are cleaned')
    return redirect(reverse('admin-form-links-list', host='admin'))


@manager_required
def form_links_view(request, form_link_id):
    form_link = get_object_or_404(FormLinks, pk=form_link_id)
    return render(request, 'Admin/FormLinks/form_links_view.html', {'form_link': form_link})
