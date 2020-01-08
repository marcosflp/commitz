import axios from 'axios';

class RepositoryService {
  constructor() {
    this.apiAuthToken = `Token ${localStorage.getItem('token')}`;

    axios.defaults.baseURL = 'http://localhost:8000/api';
  }

  registerNewRepository(fullName) {
    return axios.post(
      'repositories/register_new_repository_by_full_name/',
      { full_name: fullName },
      { headers: { Authorization: this.apiAuthToken } }
    );
  }
}

export default new RepositoryService();
