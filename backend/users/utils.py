from services.users import githubprofile as githubprofile_service


def pipeline_create_github_profile(backend, response, user, *args, **kwargs):
    """
    Social Auth Pipeline to create a new GitHubProfile after a new user logs in
    """
    if backend.name == 'github':
        githubprofile_service.create_from_social_auth(user, response)
    return None
