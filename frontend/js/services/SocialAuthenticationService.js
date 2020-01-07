import axios from 'axios';

class SocialAuthenticationService {
  constructor() {
    this.urlGitHub = 'http://localhost:8000/api/login/social/token/';
  }

  loginUserWithGitHub(code) {
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
}

export default new SocialAuthenticationService();
