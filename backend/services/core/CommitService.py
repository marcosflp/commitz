import logging

from django.db import transaction
from django.utils.timezone import make_aware
from github import Github, GithubObject

from core.models import Commit

LOGGER = logging.getLogger(__name__)


@transaction.atomic
def update_repository_commits(
    user,
    repository,
    since=GithubObject.NotSet,
    until=GithubObject.NotSet,
):
    """
    Updates the current repository with last month's commits from GitHub.

    Returns (int): total commits created.
    """
    commits_pagination_limit = 10
    github_api = Github(user.githubprofile.access_token)

    git_repository = github_api.get_repo(repository.full_name)
    repository_commits = git_repository.get_commits(
        since=since,
        until=until
    )
    if repository_commits.totalCount == 0:
        # No commits found
        return 0

    commits = []
    current_page = 0
    while current_page <= commits_pagination_limit:
        # Fetch all commits found from the current repository on GitHub.
        commit_list = repository_commits.get_page(current_page)
        if commit_list:
            commits.extend(commit_list)
            current_page += 1
        else:
            break

    # Remove commits that is already registered
    commits_sha = [github_commit.commit.sha for github_commit in commits]
    registered_commits = Commit.objects.filter(sha__in=commits_sha, repository=repository)
    for registered_commit in registered_commits:
        for index, github_commit in enumerate(commits):
            if registered_commit.sha == github_commit.commit.sha:
                commits.pop(index)

    commit_instances = [
        Commit(
            repository=repository,
            sha=github_commit.commit.sha,
            message=github_commit.commit.message,
            author=get_commit_author(github_commit).user,
            authored_date=make_aware(github_commit.commit.author.date),
        )
        for github_commit in commits
    ]
    Commit.objects.bulk_create(commit_instances)

    total_created = len(commit_instances)
    LOGGER.info(f'{total_created} Commits registered on "{repository}"')
    return total_created


def get_commit_author(github_commit):
    from services.users.GitHubProfileService import update_or_create_githubprofile

    if github_commit.author:
        data = {
            'id': github_commit.author.id,
            'login': github_commit.author.login,
            'name': github_commit.author.name,
            'email': github_commit.author.email,
            'avatar_url': github_commit.author.avatar_url,
            'created_at': make_aware(github_commit.author.created_at),
            'updated_at': make_aware(github_commit.author.updated_at),
        }
    else:
        # As it was not possible to find a registered GitHub account for the author
        # create a GitHubProfile without github ID. We need create the profile to keep track commit authors.
        data = {
            'id': None,
            'login': github_commit.commit.author.email,
            'name': github_commit.commit.author.name,
            'email': github_commit.commit.author.email,
            'avatar_url': '',
            'created_at': None,
            'updated_at': None,
        }

    profile = update_or_create_githubprofile(
        profile_data=data
    )

    return profile
