import BackEndService from 'services';

class ContentService extends BackEndService {
  fetchContents(params) {
    return this.backendApi().get('/contents', { params });
  }
}

export default new ContentService();
