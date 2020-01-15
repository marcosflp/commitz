from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from users.models import User, GitHubProfile


class BaseTestCase(APITestCase):
    USER = 'admin'
    PASSWORD = '1234qwer'
    EMAIL = 'test@test.com'

    def setUp(self):
        super(BaseTestCase, self).setUp()
        user_authentication_token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {user_authentication_token.key}')

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username=cls.USER, password=cls.PASSWORD, email=cls.EMAIL)
        GitHubProfile.objects.create(user=cls.user)
