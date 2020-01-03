from rest_framework import routers

from core.views import CommitListViewSet

api_routes = routers.DefaultRouter()
api_routes.register(r'commits/home', CommitListViewSet)


urlpatterns = api_routes.urls
