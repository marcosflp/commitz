import github
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.response import Response

from core.models import Commit, Repository
from core.serializers import HomeSerializer, RepositorySerializer, RepositoryRegistrationSerializer
from services.core import commit as commit_service
from services.core import repository as repository_service
from services.users import githubprofile as githubprofile_service


class HomeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Commit.objects.commits_for_list()
    serializer_class = HomeSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend)
    filter_fields = ('repository', 'author')
    search_fields = ('^repository__full_name', 'repository__description', 'message')


class RepositoryViewSet(viewsets.ModelViewSet):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer
    filter_backends = (SearchFilter, DjangoFilterBackend)
    filter_fields = ('owner',)
    search_fields = ('^full_name', '^name', 'description')

    @action(methods=['post'], detail=False)
    def register_new_repository_by_full_name(self, request):
        serializer = RepositoryRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            try:
                repository = repository_service.register_new_repository(
                    user=request.user,
                    full_name=serializer.data['full_name'],
                    githubprofile_service=githubprofile_service,
                    commit_service=commit_service
                )
            except github.UnknownObjectException as e:  # Repository not found
                return Response(e.data, status=e.status)
            else:
                data = {'message': _(f'Repositório "{repository}" registrado com sucesso.')}
                return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
