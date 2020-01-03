from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import SearchFilter

from core.models import Commit
from core.serializers import CommitListSerializer


class CommitListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Commit.objects.commits_for_list()
    serializer_class = CommitListSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend)
    filter_fields = ('repository', 'author')
    search_fields = ('^message', 'repository__name', 'repository__description')
