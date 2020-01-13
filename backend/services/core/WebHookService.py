from django.conf import settings
from github import Github


def create_repository_webhook(repository):
    events = ["push"]
    config = {
        "url": f"{settings.HOST}/api/handle_commits_watcher",
        "content_type": "json",
        "insecure_ssl": "0",
        "secret": settings.GITHUB_WEBHOOK_SECRET_KEY
    }

    github_api = Github(repository.owner.githubprofile.access_token)
    git_repository = github_api.get_repo(repository.full_name)
    git_repository.create_hook("web", config, events, active=True)

    return None
