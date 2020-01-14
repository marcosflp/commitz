from .local_base import *  # noqa


ALLOWED_HOSTS += ['*']

HOST = 'http://2f6fbe22.ngrok.io'

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'postgres',
#         'USER': 'postgres',
#         'HOST': 'db',
#         'PORT': 5432,
#     }
# }

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'dffs2r8c1052t',
#         'USER': 'ufxuujribybuap',
#         'PASSWORD': '29fa9b5e6bd206896707d8e8cd1af47612562df85f4cdc6cf2ca55e5ca9c1c13',
#         'HOST': 'ec2-54-243-243-136.compute-1.amazonaws.com',
#         'PORT': 5432,
#     }
# }

INSTALLED_APPS += [
    'django_extensions'
]
