from rest_framework import serializers

from users.models import User


class AuthorCommitListSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    avatar_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('pk', 'name', 'avatar_url')

    def get_name(self, obj):
        return obj.githubprofile.name

    def get_avatar_url(self, obj):
        return obj.githubprofile.avatar_url
