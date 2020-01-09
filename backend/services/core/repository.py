import datetime
import logging

from django.db import transaction
from django.utils import timezone
from django.utils.timezone import make_aware
from github import Github

from core.models import Repository

LOGGER = logging.getLogger(__name__)


@transaction.atomic
def register_new_repository(user, full_name, githubprofile_service, commit_service):
    """
    Register a new repository and all your commits from last month

    Raises:
        github.UnknownObjectException
        GitHubProfile.DoesNotExists

    Returns: (Repository) created
    """
    LOGGER.info(f'Registering a new Repository for "{full_name}"')

    github_api = Github(user.githubprofile.access_token)
    git_repository = github_api.get_repo(full_name)
    owner = get_repository_owner(user, full_name, githubprofile_service)

    repository = Repository.objects.create(
        user=user,
        github_id=git_repository.id,
        owner=owner,
        name=git_repository.name,
        full_name=git_repository.full_name,
        description=git_repository.description or '',
        language=git_repository.language or '',
        stargazers_count=git_repository.stargazers_count,
        archived=git_repository.archived,
        # disabled=git_repository.disabled,  # TODO: Encontrar o local correto de onde está esse campo
        clone_url=git_repository.clone_url or '',
        git_url=git_repository.git_url or '',
        created_at=make_aware(git_repository.created_at),
        updated_at=make_aware(git_repository.updated_at),
    )

    total_commits_created = commit_service.update_repository_commits(
        user,
        repository,
        since=timezone.now() - datetime.timedelta(days=30)
    )
    if total_commits_created == 0:
        # No commits found. Try to get all latest commits
        commit_service.update_repository_commits(
            user,
            repository,
        )

    return repository


def get_repository_owner(user, full_name, githubprofile_service):
    github_api = Github(user.githubprofile.access_token)
    git_repository = github_api.get_repo(full_name)

    owner = githubprofile_service.update_or_create_githubprofile(
        {
            'id': git_repository.owner.id,
            'login': git_repository.owner.login,
            'name': git_repository.owner.name,
            'email': git_repository.owner.email,
            'avatar_url': git_repository.owner.avatar_url,
            'created_at': git_repository.owner.created_at,
            'updated_at': git_repository.owner.updated_at,
        }
    )

    return owner.user