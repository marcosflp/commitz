import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

import SideMenu from 'components/SideMenu';

import './style.scss';

const Home = () => {
  return (
    <Grid>
      <Grid.Column width={4}>
        <SideMenu />
      </Grid.Column>

      <Grid.Column width={12}>
        <Header as="h2" className="header-page" dividing>
          Home
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default Home;
