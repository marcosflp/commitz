import django_js_reverse.views

from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),

    url('^api/auth/', include('rest_social_auth.urls_token')),
    url('^api/', include('core.urls')),

    # TODO: Analisar uma melhor forma de redirecionar as rotas para o Front
    # Essa URL está aqui para carregar o Frontend e manter a querystring da resposta do GitHub
    # Se a URL for diferente de r'^$' Django retorna 404, porque a rota está registrada no Front
    url('^login', TemplateView.as_view(template_name='core/home.html'), name='login'),

    url(r'^$', TemplateView.as_view(template_name='core/home.html'), name='home'),
]
