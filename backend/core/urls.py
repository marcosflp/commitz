from django.urls import path
from rest_framework import routers

from core.views import HomeViewSet, RepositoryViewSet, RepositoryWebhookView, CommitViewSet

api_routes = routers.DefaultRouter()

api_routes.register(r'home', HomeViewSet, basename='Home')
api_routes.register(r'repositories', RepositoryViewSet, basename='Repository')
api_routes.register(r'commits', CommitViewSet, basename='Commit')

urlpatterns = [
    path('handle_commits_watcher', RepositoryWebhookView.as_view(), name='repository_webhook')
]

urlpatterns += api_routes.urls
