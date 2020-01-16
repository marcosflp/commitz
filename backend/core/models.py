from django.db import models
from django.utils.translation import ugettext_lazy as _

from core.managers import CommitManager


class Repository(models.Model):
    user = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='repositories',
        help_text=_('Authenticated user.')
    )

    github_id = models.PositiveIntegerField(null=True)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='owner_repositories')

    name = models.CharField(max_length=100)
    full_name = models.CharField(max_length=100)
    description = models.CharField(max_length=255, blank=True, default='')
    language = models.CharField(max_length=64, blank=True, default='')
    stargazers_count = models.PositiveIntegerField(null=True, blank=True)

    archived = models.BooleanField(default=False)
    disabled = models.BooleanField(default=False)

    clone_url = models.URLField(blank=True, default='')
    git_url = models.URLField(blank=True, default='')

    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        unique_together = ('user', 'full_name')

    def __str__(self):
        return self.full_name if self.full_name else self.name


class Commit(models.Model):
    sha = models.CharField(max_length=64)

    repository = models.ForeignKey('core.Repository', on_delete=models.CASCADE)
    message = models.TextField(blank=True, default='')

    author = models.ForeignKey('users.User', null=True, blank=True, on_delete=models.PROTECT)
    authored_date = models.DateTimeField()

    objects = CommitManager()

    class Meta:
        unique_together = ('sha', 'repository')

    def __str__(self):
        return f'{self.sha}'


class Content(models.Model):
    repository = models.ForeignKey('core.Repository', on_delete=models.CASCADE)

    sha = models.CharField(max_length=64)
    name = models.CharField(max_length=128)

    type = models.CharField(max_length=32, blank=True, default='')
    path = models.CharField(max_length=64, blank=True, default='')
    size = models.IntegerField(null=True, blank=True)

    url = models.URLField(blank=True, default='')
    download_url = models.URLField(blank=True, default='')

    class Meta:
        unique_together = ('repository', 'sha')

    def __str__(self):
        return self.name
