from rest_framework import routers

from core.views import HomeViewSet, RepositoryViewSet

api_routes = routers.DefaultRouter()
api_routes.register(r'home', HomeViewSet, basename='Commit')
api_routes.register(r'repositories', RepositoryViewSet, basename='Repository')


urlpatterns = api_routes.urls
