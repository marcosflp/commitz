import BackEndService from 'services';

class UserService extends BackEndService {
  fetchCurrentUser() {
    return this.backendApi().get('/users');
  }
}

export default new UserService();
