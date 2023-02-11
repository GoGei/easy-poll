from settings import *

DEBUG = True

TEMPLATES[0]['OPTIONS']['debug'] = True

SECRET_KEY = '<YOUR KEY>'

EMAIL_HOST_USER = ''
DEFAULT_FROM_EMAIL = ''
EMAIL_HOST_PASSWORD = '<PASSWORD OR SECURITY CODE OF APP>'
RECIPIENT = ''

# url options
SITE_URL = 'easy-poll.local'
SITE_SCHEME = "http"
PARENT_HOST = ".%s" % SITE_URL
HOST_PORT = '1111'
SITE = "%s://%s:%s" % (SITE_SCHEME, SITE_URL, HOST_PORT)
