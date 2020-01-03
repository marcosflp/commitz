import logging

from users.models import GitHubProfile

LOGGER = logging.getLogger(__name__)


def create_from_social_auth(user, github_profile_data):
    fields = ['id', 'login', 'name', 'email', 'created_at', 'updated_at']
    defaults = {}
    for field_name in fields:
        defaults[field_name] = github_profile_data[field_name]

    profile = GitHubProfile.objects.update_or_create(user=user, defaults=defaults)

    return profile
