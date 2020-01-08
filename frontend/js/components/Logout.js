import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthService from '../services/AuthService';

const Logout = () => {
  AuthService.logOutUser();
  return <Redirect to="/login" />;
};

export default Logout;
