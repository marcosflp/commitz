import BackendService from 'services';

class CommitService extends BackendService {
  fetchCommits(params) {
    if (params !== undefined) {
      return this.backendApi().get('/commits/', { params });
    }
    return this.backendApi().get('/commits/');
  }

  fetchDataTable(params) {
    if (params !== null) {
      return this.backendApi().get('/commits/home/', { params });
    }
    return this.backendApi().get('/commits/home/');
  }
}

export default new CommitService();
