import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { OAuthGitHubUrl } from '../constants';

class AuthService {
  authenticateUserWithGitHub(code) {
    return axios
      .post(OAuthGitHubUrl, { provider: 'github', code })
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
    localStorage.removeItem('token');
    return <Redirect to="/login" />;
  }
}

export default new AuthService();