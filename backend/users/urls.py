from rest_framework import routers

from users.views import UserViewSet

api_routes = routers.DefaultRouter()
api_routes.register('users', UserViewSet, basename='repository')

urlpatterns = api_routes.urls
