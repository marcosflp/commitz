import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import SideMenu from '../components/SideMenu';

import Home from './Home';
import RepositoryList from './Repository/RepositoryList';
import RepositoryDetail from './Repository';

const Root = () => {
  return (
    <Grid className="home" relaxed="very">
      <Grid.Column width={4}>
        <SideMenu />
      </Grid.Column>

      <Grid.Column className="main-container" width={12}>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/repositories">
          <RepositoryList />
        </Route>

        <Route exact path="/repositories/:repositoryId">
          <RepositoryDetail />
        </Route>
      </Grid.Column>
    </Grid>
  );
};

export default Root;
