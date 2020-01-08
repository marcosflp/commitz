import React from 'react';
import { Redirect } from 'react-router-dom';
import { Message, Icon, Grid } from 'semantic-ui-react';

import AuthService from '../services/AuthService';

class CompleteGitHubAuth extends React.Component {
  constructor(props) {
    super(props);

    const queryParams = new URLSearchParams(window.location.search);

    this.state = {
      code: queryParams.get('code'),
      isAuthenticating: false,
    };
  }

  componentDidMount() {
    this.loginUser();
  }

  loginUser() {
    const { code } = this.state;
    const self = this;

    this.setState({ isAuthenticating: true });

    AuthService.authenticateUserWithGitHub(code)
      .then(() => {
        return null;
      })
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => {
        self.setState({ isAuthenticating: false });
    });
  }

  render() {
    const { isAuthenticating } = this.state;

    if (AuthService.isUserAuthenticated()) {
      return <Redirect to="/" />;
    }

    if (isAuthenticating) {
      return (
        <Grid centered>
          <Grid.Column width={12}>
            <Message icon>
              <Icon loading name="circle notched" />
              <Message.Content>
                <Message.Header>Finalizando autenticação</Message.Header>
                Aguarde um momento, você será redirecionado automaticamente.
              </Message.Content>
            </Message>
          </Grid.Column>
        </Grid>
      );
    }

    return (
      <Grid centered>
        <Grid.Column width={12}>
          <Message negative>
            <Message.Content>
              <Message.Header>Ocorreu um erro ao tentar autenticar seu usuário</Message.Header>
              Por favor, contato o suporte.
            </Message.Content>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CompleteGitHubAuth;
