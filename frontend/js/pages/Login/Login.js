import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Segment, Icon } from 'semantic-ui-react';

import './style.scss';

const Login = () => {
  return (
    <Grid className="menu-box" verticalAlign="middle">
      <Grid.Column className="content" width={5}>
        <Segment placeholder>
          <Header icon>
            <Icon name="github" />
            CommitZ
          </Header>
          <Link to="/login/with_github">
            <Button color="black">Entrar com GitHub</Button>
          </Link>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
