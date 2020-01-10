import BackendService from 'services';

class RepositoryService extends BackendService {
  registerNewRepository(fullName) {
    return this.backendApi().post('repositories/register_new_repository_by_full_name/', {
      full_name: fullName,
    });
  }

  fetchRepositories(params) {
    if (params !== undefined) {
      return this.backendApi().get('/repositories', { params });
    }
    return this.backendApi().get('/repositories');
  }
}

export default new RepositoryService();
