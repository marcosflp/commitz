from django.db import models

from core.managers import CommitManager


class Repository(models.Model):
    github_id = models.PositiveIntegerField(unique=True, null=True)

    owner = models.ForeignKey('users.User', on_delete=models.CASCADE)

    name = models.CharField(max_length=100)
    full_name = models.CharField(max_length=100, unique=True, null=True)
    description = models.CharField(max_length=255, blank=True, default='')
    language = models.CharField(max_length=64, blank=True, default='')
    stargazers_count = models.PositiveIntegerField(null=True, blank=True)

    archived = models.BooleanField(default=False)
    disabled = models.BooleanField(default=False)

    clone_url = models.URLField(blank=True, default='')
    git_url = models.URLField(blank=True, default='')

    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    def __str__(self):
        return self.full_name if self.full_name else self.name


class Commit(models.Model):
    sha = models.UUIDField()

    repository = models.ForeignKey('core.Repository', on_delete=models.CASCADE)
    message = models.TextField(blank=True, default='')

    author = models.ForeignKey('users.User', null=True, blank=True, on_delete=models.SET_NULL)
    authored_date = models.DateTimeField(null=True, blank=True)

    objects = CommitManager()

    def __str__(self):
        return f'{self.sha}'


class Content(models.Model):
    sha = models.UUIDField()
    name = models.CharField(max_length=128)

    type = models.CharField(max_length=32, blank=True, default='')
    path = models.CharField(max_length=64, blank=True, default='')
    size = models.IntegerField(null=True, blank=True)

    url = models.URLField(blank=True, default='')
    download_url = models.URLField(blank=True, default='')

    def __str__(self):
        return self.name
