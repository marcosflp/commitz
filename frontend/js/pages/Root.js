import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Logout from 'components/Logout';

import ExternalRedirect from '../utils';

import Home from './Home';
import CompleteGitHubAuth from './CompleteGitHubAuth';
import Login from './Login';

const Root = () => {
  return (
    <>
      <Router>
        <Link to="/login/complete_github_auth" />

        <Switch>
          <div className="ui container-fluid">
            <Route path="/login/complete_github_auth">
              <CompleteGitHubAuth />
            </Route>
            <Route path="/login/with_github">
              <ExternalRedirect to="https://github.com/login/oauth/authorize?client_id=c5b2afe1322f2e960fe1" />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>
          </div>
        </Switch>
      </Router>
    </>
  );
};

export default Root;