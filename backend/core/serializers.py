from rest_framework import serializers

from core.models import Commit, Repository
from users.serializers import AuthorHomeSerializer


class RepositoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ('pk', 'name', 'full_name')


class HomeSerializer(serializers.ModelSerializer):
    author = AuthorHomeSerializer(read_only=True)
    repository = RepositoryListSerializer(read_only=True)

    class Meta:
        model = Commit
        fields = ('sha', 'message', 'author', 'authored_date', 'repository')


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = (
            'pk', 'github_id', 'owner', 'name', 'full_name', 'description', 'language', 'stargazers_count',
            'archived', 'disabled', 'clone_url', 'git_url', 'created_at', 'updated_at'
        )


class RepositoryRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ('full_name',)
        extra_kwargs = {'full_name': {'required': True}}


class CommitSerializer(serializers.ModelSerializer):
    author = AuthorHomeSerializer(read_only=True)

    class Meta:
        model = Commit
        fields = ('sha', 'repository', 'message', 'author', 'authored_date')
