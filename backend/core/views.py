import datetime

import github
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from common.exceptions import RepositoryNotBelongToUserException
from common.mixins import ValidateWebHookSignatureMixin
from core.models import Commit, Repository
from core.serializers import HomeSerializer, RepositorySerializer, RepositoryRegistrationSerializer, CommitSerializer
from services.core import CommitService
from services.core import RepositoryService
from services.users import GitHubProfileService
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
    def add_new_repository_by_full_name(self, request):
        serializer = RepositoryRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            try:
                repository = RepositoryService.add_and_monitor_new_repository(
                    user=request.user,
                    full_name=serializer.data['full_name'],
                    githubprofile_service=GitHubProfileService,
                    commit_service=CommitService
                )
            except github.UnknownObjectException:
                data = {'message': _('Repositório não encontrado.')}
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            except GitHubProfile.DoesNotExist:
                data = {'message': _('Seu usuário não possui uma conta do GitHub associada.')}
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            except RepositoryNotBelongToUserException:
                data = {'message': _('Esse repositório não pertence a seu usuário.')}
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            else:
                data = {'message': _(f'Repositório "{repository}" registrado com sucesso. Atualize a página para visualizá-los')}
                return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RepositoryWebhookView(ValidateWebHookSignatureMixin, APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        event = request.META.get('HTTP_X_GITHUB_EVENT', 'ping')
        if event == 'ping':
            return Response({'message': 'ok'}, status=status.HTTP_202_ACCEPTED)

        data = request.data
        repository_id = data['repository']['id']
        owner_id = data['repository']['owner']['id']

        try:
            repository = Repository.objects.get(github_id=repository_id)
        except Repository.DoesNotExist:
            return Response({'message': 'Repository not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            owner = GitHubProfile.objects.select_related('user').get(github_id=owner_id)
        except GitHubProfile.DoesNotExist:
            return Response({'message': 'Repository owner not found'}, status=status.HTTP_404_NOT_FOUND)

        CommitService.update_repository_commits(
            user=owner.user,
            repository=repository,
            since=timezone.now() - datetime.timedelta(days=1)
        )

        return Response({'message': 'ok'}, status=status.HTTP_200_OK)


class CommitViewSet(viewsets.ModelViewSet):
    serializer_class = CommitSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend)
    filter_fields = ('repository', 'author')
    search_fields = ('^message',)

    def get_queryset(self):
        return Commit.objects.filter(repository__user=self.request.user)
