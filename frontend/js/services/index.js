import axios from 'axios';

import { BackEndApiURL } from '../constants';

class BackEndService {
  backendApi() {
    return axios.create({
      baseURL: BackEndApiURL,
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    });
  }
}

export default BackEndService;
