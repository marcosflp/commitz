from rest_framework import serializers

from users.models import User


class AuthorHomeSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    avatar_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('pk', 'name', 'avatar_url', 'email')

    def get_name(self, obj):
        if hasattr(obj, 'githubprofile'):
            return obj.githubprofile.name
        else:
            return ''

    def get_avatar_url(self, obj):
        if hasattr(obj, 'githubprofile'):
            return obj.githubprofile.avatar_url
        else:
            return ''
