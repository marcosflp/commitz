from django.urls import path
from rest_framework import routers

from core.views import CommitHomeViewSet, RepositoryViewSet, RepositoryWebhookView, CommitViewSet, ContentViewSet

api_routes = routers.DefaultRouter()

api_routes.register('repositories', RepositoryViewSet, basename='repository')
api_routes.register('commits/home', CommitHomeViewSet, basename='commit-home')
api_routes.register('commits', CommitViewSet, basename='commit')
api_routes.register('contents', ContentViewSet, basename='content')

urlpatterns = [
    path('handle_commits_watcher', RepositoryWebhookView.as_view(), name='repository_webhook')
]

urlpatterns += api_routes.urls
