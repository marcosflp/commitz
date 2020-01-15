import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import SentryBoundary from './utils/SentryBoundary';
import CompleteGitHubAuth from './pages/CompleteGitHubAuth';
import ExternalRedirect from './utils';
import { GitHubLoginUri } from './constants';
import Login from './pages/Login';
import Logout from './components/Logout';
import SideMenu from './components/SideMenu';
import CommitList from './pages/Commit';
import RepositoryList from './pages/Repository/RepositoryList';
import RepositoryDetail from './pages/Repository';

const App = () => {
  return (
    <SentryBoundary>
      <BrowserRouter>
        <Link to="/login/complete_github_auth" />

        <Switch>
          <div className="ui container-fluid">
            <Route exact path="/login/complete_github_auth">
              <CompleteGitHubAuth />
            </Route>
            <Route exact path="/login/with_github">
              <ExternalRedirect to={GitHubLoginUri} />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>

            <Grid className="home" relaxed="very">
              <Route exact path="/repositories">
                <Grid.Column width={4}>
                  <SideMenu activeItem="repositories" />
                </Grid.Column>

                <Grid.Column className="main-container" width={12}>
                  <RepositoryList />
                </Grid.Column>
              </Route>

              <Route exact path="/repositories/:repositoryId">
                <Grid.Column width={4}>
                  <SideMenu activeItem="repositories" />
                </Grid.Column>

                <Grid.Column className="main-container" width={12}>
                  <RepositoryDetail />
                </Grid.Column>
              </Route>

              <Route exact path="/">
                <Grid.Column width={4}>
                  <SideMenu activeItem="commits" />
                </Grid.Column>

                <Grid.Column className="main-container" width={12}>
                  <CommitList />
                </Grid.Column>
              </Route>
            </Grid>
          </div>
        </Switch>
      </BrowserRouter>
    </SentryBoundary>
  );
};

export default hot(module)(App);
