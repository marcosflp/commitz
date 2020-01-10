import logging

from users.models import GitHubProfile, User

LOGGER = logging.getLogger(__name__)


def update_or_create_githubprofile(profile_data, user=None):
    """
    Accepts any mapping object that has field names of GitHubProfile in the keys
    """
    # Ensure that is a editable object and that `profile_data` is a mapping object
    profile_data = dict(profile_data)

    # FIXME: Check if exists a User before create the GitHubProfile
    profile_id = profile_data.pop('id')
    profile_data['user'] = user or User.objects.get_or_create(login=profile_data['login'])[0]
    profile_data['name'] = profile_data['name'] or ''

    profile, profile_created = GitHubProfile.objects.update_or_create(
        github_id=profile_id,
        defaults=profile_data
    )

    LOGGER.info(f'GitHub profile "{profile}" {"created" if profile_created else "updated"}.')
    return profile
