from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import ugettext_lazy as _

from common.models import IndexedTimeStampedModel

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin, IndexedTimeStampedModel):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=255, blank=True, default='')

    is_staff = models.BooleanField(
        default=False,
        help_text=_('Designates whether the user can log into this admin '
                    'site.'))
    is_active = models.BooleanField(
        default=True,
        help_text=_('Designates whether this user should be treated as '
                    'active. Unselect this instead of deleting accounts.'))

    objects = UserManager()

    # The USERNAME_FIELD must be `username` Python Social Auth require that field on user authentication/creation
    USERNAME_FIELD = 'username'

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def __str__(self):
        return self.username or self.email


class GitHubProfile(models.Model):
    github_id = models.PositiveIntegerField(unique=True, null=True)
    access_token = models.CharField(
        max_length=128,
        blank=True,
        default='',
        help_text=_('Oauth Token to authenticate user with GitHub api')
    )

    user = models.OneToOneField('users.User', on_delete=models.CASCADE)

    login = models.CharField(max_length=100, unique=True, null=True)
    name = models.CharField(max_length=255, blank=True, default='')
    email = models.EmailField(blank=True, null=True)
    avatar_url = models.URLField(blank=True, default='')

    created_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.name if self.name else self.login}'
    
    @property
    def has_github_account(self):
        return bool(self.github_id)
