from django.urls import reverse
from django.utils import timezone
from model_mommy import mommy
from rest_framework import status

from common.tests import BaseTestCase
from core.models import Repository, Commit
from core.serializers import RepositorySerializer, CommitSerializer


class RepositoryTest(BaseTestCase):
    """
    RepositoryViewSet tests
    """

    def setUp(self):
        super(RepositoryTest, self).setUp()
        self.repository = mommy.make('core.Repository', user=self.user)

        self.valid_repository = {
            'user': self.user.pk,
            'github_id': 123,
            'owner': self.user.pk,
            'name': 'commitz',
            'full_name': 'marcosflp/commitz',
            'description': 'A simple description',
            'language': 'Python',
            'stargazers_count': 30,
            'archived': False,
            'disabled': False,
            'clone_url': 'https://www.github.com/marcosflp/commitz.git',
            'git_url': 'https://www.github.com/marcosflp/commitz',
            'created_at': timezone.now(),
            'updated_at': timezone.now(),
        }

        self.invalid_repository = {
            'user': None,
            'github_id': None,
            'owner': None,
            'name': '',
            'full_name': '',
            'description': '',
            'language': '',
            'stargazers_count': None,
            'archived': False,
            'disabled': False,
            'clone_url': '',
            'git_url': '',
            'created_at': None,
            'updated_at': None
        }

    def test_it_is_possible_to_create_a_repository(self):
        """
        Ensure we can create a repository
        """
        url = reverse('repository-list')
        count = Repository.objects.all().count()

        response = self.client.post(url, self.valid_repository, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Repository.objects.all().count(), count+1)

    def test_it_is_not_possible_to_create_a_repository_with_invalid_values(self):
        """
        Ensure we can't create a repository with invalid values
        """
        url = reverse('repository-list')
        count = Repository.objects.all().count()

        response = self.client.post(url, self.invalid_repository, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Repository.objects.all().count(), count)

    def test_it_is_possible_to_update_a_repository(self):
        """
        Ensure we can update a repository
        """
        url = reverse('repository-detail', kwargs={'pk': self.repository.pk})
        response = self.client.put(url, data=self.valid_repository)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.valid_repository['name'])

    def test_it_is_not_possible_to_update_a_repository_with_invalid_values(self):
        """
        Ensure we can't update a repository with invalid values
        """
        url = reverse('repository-detail', kwargs={'pk': self.repository.pk})
        response = self.client.put(url, data=self.invalid_repository, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_it_is_possible_to_delete_a_repository(self):
        """
        Ensure we can delete a repository
        """
        url = reverse('repository-detail', kwargs={'pk': self.repository.pk})
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_it_is_possible_to_list_all_repository(self):
        """
        Ensure we can list all repository
        """
        mommy.make('Repository', owner=self.user, user=self.user)
        mommy.make('Repository')
        url = reverse('repository-list')

        response = self.client.get(url)
        repositories = Repository.objects.filter(user=self.user).order_by('full_name')
        serializer = RepositorySerializer(repositories, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], serializer.data)

    # READ DETAIL

    def test_it_is_possible_to_read_repository_detail(self):
        """
        Ensure we can read a repository detail
        """
        url = reverse('repository-detail', kwargs={'pk': self.repository.pk})
        response = self.client.get(url)

        serializer = RepositorySerializer(self.repository)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    # FILTERS

    def test_it_is_possible_to_filter_repository_by_owner(self):
        """
        Ensure we can filter a repository by owner
        """
        url = reverse('repository-list')
        query = {'owner': self.repository.owner.pk}

        response = self.client.get(url, query)
        repositories = Repository.objects.filter(owner=self.repository.owner.pk).order_by('full_name')
        serializer = RepositorySerializer(repositories, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], serializer.data)


class CommitTest(BaseTestCase):
    """
    CommitViewSet tests
    """

    def setUp(self):
        super(CommitTest, self).setUp()
        self.repository = mommy.make('core.Repository', user=self.user)
        self.commit = mommy.make('core.Commit', repository=self.repository)

        self.valid_commit = {
            'sha': 'ecf3cf47cf124024b7628dfb74d1c95a',
            'repository': self.repository.pk,
            'message': 'A simple test message',
            'authored_date': timezone.now()
        }

        self.invalid_commit = {
            'sha': '',
            'repository': None,
            'message': '',
            'authored_date': None
        }

    def test_it_is_possible_to_create_a_commit(self):
        """
        Ensure we can create a commit
        """
        url = reverse('commit-list')
        count = Commit.objects.all().count()

        response = self.client.post(url, self.valid_commit, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Commit.objects.all().count(), count+1)

    def test_it_is_not_possible_to_create_a_commit_with_invalid_values(self):
        """
        Ensure we can't create a commit with invalid values
        """
        url = reverse('commit-list')
        count = Repository.objects.all().count()

        response = self.client.post(url, self.invalid_commit, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Commit.objects.all().count(), count)

    def test_it_is_possible_to_update_a_commit(self):
        """
        Ensure we can update a commit
        """
        url = reverse('commit-detail', kwargs={'pk': self.commit.pk})
        response = self.client.put(url, data=self.valid_commit, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['sha'], self.valid_commit['sha'])

    def test_it_is_not_possible_to_update_a_commit_with_invalid_values(self):
        """
        Ensure we can't update a commit with invalid values
        """
        url = reverse('commit-detail', kwargs={'pk': self.commit.pk})
        response = self.client.put(url, data=self.invalid_commit, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_it_is_possible_to_delete_a_commit(self):
        """
        Ensure we can delete a commit
        """
        url = reverse('commit-detail', kwargs={'pk': self.commit.pk})
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_it_is_possible_to_list_all_commit(self):
        """
        Ensure we can list all commit
        """
        mommy.make('Commit', repository=self.repository)
        mommy.make('Commit')
        url = reverse('commit-list')

        response = self.client.get(url)
        commits = Commit.objects.filter(repository=self.repository).order_by('-authored_date')
        serializer = CommitSerializer(commits, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], serializer.data)

    def test_it_is_possible_to_read_commit_detail(self):
        """
        Ensure we can read a commit detail
        """
        url = reverse('commit-detail', kwargs={'pk': self.commit.pk})
        response = self.client.get(url)

        serializer = CommitSerializer(self.commit)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_it_is_possible_to_filter_commit_by_repository(self):
        """
        Ensure we can filter a commit by repository
        """
        url = reverse('commit-list')
        response = self.client.get(url)

        commits = Commit.objects.filter(repository=self.repository)
        serializer = CommitSerializer(commits, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], serializer.data)
