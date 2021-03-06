import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { BackendGitHubCompleteLoginUri } from '../constants';

class AuthService {
  authenticateUserWithGitHub(code) {
    return axios
      .post(BackendGitHubCompleteLoginUri, { provider: 'github', code })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  logOutUser() {
    localStorage.clear();
    return <Redirect to="/login" />;
  }
}

export default new AuthService();
