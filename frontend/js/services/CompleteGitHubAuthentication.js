import React from 'react';
import { Redirect } from 'react-router-dom';

import SocialAuthenticationService from 'services/SocialAuthenticationService';

class CompleteGitHubAuthentication extends React.Component {
  constructor(props) {
    super(props);

    const queryParams = new URLSearchParams(window.location.search);

    this.state = {
      code: queryParams.get('code'),
      isAuthenticating: false,
      isUserAuthenticated: false,
    };
  }

  componentDidMount() {
    this.loginUser();
  }

  loginUser() {
    const { code } = this.state;
    const self = this;

    this.setState({ isAuthenticating: true });

    SocialAuthenticationService.loginUserWithGitHub(code)
      .then(() => {
        self.setState({ isUserAuthenticated: true, isAuthenticating: false });
        return null;
      })
      .catch((error) => {
        self.setState({ isAuthenticating: false });
        throw new Error(error);
      });
  }

  render() {
    const { isAuthenticating, isUserAuthenticated } = this.state;
    let body;

    if (isUserAuthenticated) {
      body = <Redirect to="/" />;
    } else if (isAuthenticating) {
      body = <h1>Autenticando usuário...</h1>;
    } else {
      body = <h1>Ocorreu um erro ao tentar autenticar usuário</h1>;
    }

    return <div>{body}</div>;
  }
}

export default CompleteGitHubAuthentication;
