import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const generateClassName = createGenerateClassName({ productionPrefix: 'auth' });

export default ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signup">
              <SignUp onSignIn={onSignIn} />
            </Route>
            <Route path="/auth/signin">
              <SignIn onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
