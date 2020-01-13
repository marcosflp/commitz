import hashlib
import hmac

from django.conf import settings
from rest_framework import status
from rest_framework.response import Response


class ValidateWebHookSignatureMixin:
    """
    Reference: https://developer.github.com/webhooks/securing/
    """

    def dispatch(self, request, *args, **kwargs):
        github_signature = request.META.get('HTTP_X_HUB_SIGNATURE', '')
        signature = hmac.new(settings.GITHUB_WEBHOOK_SECRET_KEY.encode(), request.body, hashlib.sha1)
        expected_signature = 'sha1=' + signature.hexdigest()
        if not hmac.compare_digest(github_signature, expected_signature):
            return Response('Invalid signature', status=status.HTTP_400_BAD_REQUEST)

        return super().dispatch(request, *args, **kwargs)
