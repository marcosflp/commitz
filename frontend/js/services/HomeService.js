import BackEndService from 'services';

class HomeService extends BackEndService {
  fetchDataTable(params) {
    if (params !== null) {
      return this.backendApi().get('/home/', { params });
    }
    return this.backendApi().get('/home/');
  }
}

export default new HomeService();
