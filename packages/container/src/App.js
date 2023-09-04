import React, { Suspense, lazy, useState, useEffect } from 'react';
import Header from './components/Header';
import {
  BrowserRouter,
  Route,
  Switch,
  Router,
  Redirect
} from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles';
import Progress from './components/Progress';
import { createBrowserHistory } from 'history';

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
  seed: 'co'
});

const MarketingApp = lazy(() => import('./components/MarketingApp'));
const AuthApp = lazy(() => import('./components/AuthApp'));
const DashboardApp = lazy(() => import('./components/DashboardApp'));

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) history.push('/dashboard');
  }, [isSignedIn]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardApp />
              </Route>
              <Route path="/" component={MarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StylesProvider>
  );
};
