import os
import random

from fabric.api import local, lcd, cd
from fabric.contrib import django
from fabric.decorators import task

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__)) + '/'

django.project('easy-poll')
django.settings_module('config.local_settings')
from config import local_settings as dj_settings


def _launch_django(project_path):
    port = dj_settings.HOST_PORT
    if not port:
        summ = sum([ord(char) for char in project_path.split('/')[-2]])
        random.seed(summ)
        port = random.randrange(1024, 5000)

    server_address = '127.0.0.1'
    hosts_path = 'c:\Windows\System32\Drivers\etc\hosts' if os.name == 'nt' else '/etc/hosts'
    if os.path.exists(hosts_path):
        with open(hosts_path) as f:
            if f.read().find(dj_settings.SITE_URL) != -1:
                server_address = dj_settings.SITE_URL

    with lcd(project_path):
        local(f'python manage.py runserver {server_address}:{port}', capture=False)


@task
def runserver():
    _launch_django(PROJECT_ROOT)


@task
def deploy_local(branch=None):
    branch = branch or 'master'

    local('git checkout %s && git pull origin %s' % (branch, branch))
    local('pip3 install -r requirements.txt')
    local('./manage.py migrate')
    # local('./manage.py collectstatic --noinput')


@task
def check():
    local('python manage.py check')
    local('time flake8 ./core ./Polls ./Admin')
