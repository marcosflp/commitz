import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CompleteGitHubAuthentication from 'services/CompleteGitHubAuthentication';

import Home from './pages/Home';
import Login from './pages/Login';
import SentryBoundary from './utils/SentryBoundary';

const App = () => (
  <SentryBoundary>
    <Router>
      <div>
        <ul>
          <Link to="/login/complete_github_auth" />

          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>

      <Switch>
        <Route path="/login/complete_github_auth">
          <CompleteGitHubAuthentication />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </SentryBoundary>
);

export default hot(module)(App);
