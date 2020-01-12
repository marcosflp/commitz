from services.users import GitHubProfileService


def pipeline_create_github_profile(backend, response, user, *args, **kwargs):
    """
    Social Auth Pipeline to create a new GitHubProfile after a new user logs in
    """
    if not backend.name == 'github':
        return None

    githubprofile_defaults = {}
    fields = ['id', 'login', 'name', 'email', 'avatar_url', 'created_at', 'updated_at', 'access_token']
    for field_name in fields:
        githubprofile_defaults[field_name] = response[field_name]

    GitHubProfileService.update_or_create_githubprofile(githubprofile_defaults, user)

    return None
