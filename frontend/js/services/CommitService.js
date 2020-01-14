import BackendService from 'services';

class CommitService extends BackendService {
  fetchCommits(params) {
    if (params !== undefined) {
      return this.backendApi().get('/commits/', { params });
    }
    return this.backendApi().get('/commits/');
  }
}

export default new CommitService();
