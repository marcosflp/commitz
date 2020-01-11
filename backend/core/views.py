import github
from django.utils.translation import ugettext_lazy as _
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
from users.models import GitHubProfile


class HomeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = HomeSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend)
    filter_fields = ('repository', 'author')
    search_fields = ('^repository__full_name', 'repository__description', 'message')

    def get_queryset(self):
        return Commit.objects.commits_for_list(self.request.user)


class RepositoryViewSet(viewsets.ModelViewSet):
    serializer_class = RepositorySerializer
    filter_backends = (SearchFilter, DjangoFilterBackend)
    filter_fields = ('owner',)
    search_fields = ('^full_name', '^name', 'description')

    def get_queryset(self):
        return Repository.objects.filter(user=self.request.user)

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
            except github.UnknownObjectException:
                data = {'message': _('Repositório não encontrado.')}
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            except GitHubProfile.DoesNotExist:
                data = {'message': _('Seu usuário não possui uma conta do GitHub associada.')}
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            else:
                data = {'message': _(f'Repositório "{repository}" registrado com sucesso. Atualize a página para visualizá-los')}
                return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
