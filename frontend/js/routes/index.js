import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthService from '../services/AuthService';

const PrivateRoute = ({ component, ...rest }) =>  {
  const isLogged = AuthService.isUserAuthenticated();

  if (!isLogged) {
    return (
      <Redirect to="/login" />
    )
  }

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
