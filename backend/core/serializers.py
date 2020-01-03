from rest_framework import serializers


from core.models import Commit, Repository
from users.serializers import AuthorCommitListSerializer


class RepositoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ('pk', 'name', 'full_name')


class CommitListSerializer(serializers.ModelSerializer):
    author = AuthorCommitListSerializer(read_only=True)
    repository = RepositoryListSerializer(read_only=True)

    class Meta:
        model = Commit
        fields = ('sha', 'message', 'authored_date', 'author', 'repository')
