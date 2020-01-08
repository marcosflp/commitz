import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class AuthService {
  constructor() {
    this.urlGitHub = 'http://localhost:8000/api/auth/social/token/';
  }

  authenticateUserWithGitHub(code) {
    return axios
      .post(this.urlGitHub, { provider: 'github', code })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        return null;
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
