import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import SentryBoundary from './utils/SentryBoundary';
import CompleteGitHubAuth from './pages/CompleteGitHubAuth';
import ExternalRedirect from './utils';
import { GitHubLoginUri } from './constants';
import Login from './pages/Login';
import Logout from './components/Logout';
import Root from './pages/Root';

const App = () => (
  <SentryBoundary>
    <BrowserRouter>
      <Link to="/login/complete_github_auth" />

      <Switch>
        <div className="ui container-fluid">
          <Route path="/login/complete_github_auth">
            <CompleteGitHubAuth />
          </Route>
          <Route path="/login/with_github">
            <ExternalRedirect to={GitHubLoginUri} />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>

          <Root />
        </div>
      </Switch>
    </BrowserRouter>
  </SentryBoundary>
);

export default hot(module)(App);
