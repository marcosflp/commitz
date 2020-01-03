import django_js_reverse.views

from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic import TemplateView


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', login_required(django_js_reverse.views.urls_js), name='js_reverse'),

    url('^oauth/', include('social_django.urls', namespace='social')),
    url('^login/$', LoginView.as_view(), name='login'),
    url('^logout/$', LogoutView.as_view(), name='logout'),

    url('^api/', include('core.urls')),

    url(r'^$', login_required(TemplateView.as_view(template_name='core/home.html')), name='home'),
]
