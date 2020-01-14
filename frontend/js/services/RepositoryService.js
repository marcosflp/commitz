import BackendService from 'services';

class RepositoryService extends BackendService {
  registerNewRepository(fullName) {
    return this.backendApi().post('repositories/add_new_repository_by_full_name/', {
      full_name: fullName,
    });
  }

  fetchRepositories(params) {
    if (params !== undefined) {
      return this.backendApi().get('/repositories/', { params });
    }
    return this.backendApi().get('/repositories/');
  }

  fetchRepository(repositoryId) {
    return this.backendApi().get(`repositories/${repositoryId}/`);
  }
}

export default new RepositoryService();
