import logging

from django.db import transaction
from github import Github

from core.models import Content

LOGGER = logging.getLogger(__name__)


@transaction.atomic
def update_repository_contents(user, repository):
    LOGGER.info(f'Registering "{repository.full_name}" contents')

    github_api = Github(user.githubprofile.access_token)
    git_repository = github_api.get_repo(repository.full_name)
    git_contents = git_repository.get_contents("")

    content_instances = [
        Content(
            repository=repository,
            sha=git_content.sha,
            name=git_content.name,
            type=git_content.type,
            path=git_content.path,
            size=git_content.size,
            url=git_content.url,
            download_url=git_content.download_url or '',
        )
        for git_content in git_contents
    ]

    Content.objects.bulk_create(content_instances)

    total_created = len(content_instances)
    LOGGER.info(f'{total_created} Contents registered on "{repository}"')
    return total_created
