import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthService from '../services/AuthService';

const PrivateRoute = ({ component, ...rest }) =>  {
  console.log('>>>>>>> CompleteGitHubAuthh.PrivateRoute');
  const isLogged = AuthService.isUserAuthenticated();

  if (!isLogged) {
    console.log('>>>>>>> PrivateRoute.PrivateRoute:11');
    return (
      <Redirect to="/login" />
    )
  }

  console.log('>>>>>>> PrivateRoute.PrivateRoute:17');
  return (
    <Route
      {...rest}
      render={({ location }) =>
        component
      }
    />
  );
};

export default PrivateRoute;
