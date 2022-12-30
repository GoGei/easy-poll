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
    with lcd(project_path):
        local(f'python manage.py runserver {server_address}:{port}', capture=False)


@task
def runserver():
    _launch_django(PROJECT_ROOT)


@task
def deploy_local(branch=None):
    branch = branch or 'main'

    local('git checkout %s && git pull' % branch)
    local('pip3 install -r requirements.txt')
    local('./manage.py migrate')
    local('./manage.py collectstatic --noinput')


@task
def check():
    local('python manage.py check')
    local('time flake8 ./core ./Polls')
