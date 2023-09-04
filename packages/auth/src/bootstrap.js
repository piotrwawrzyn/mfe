import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

const mount = (
  element,
  { onNavigate, onSignIn, defaultHistory, initialPath }
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath]
    });

  history.listen(({ pathname }) => {
    onNavigate(pathname);
  });

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, element);

  return {
    onParentNavigate(nextPathName) {
      if (nextPathName !== history.location.pathname)
        history.push(nextPathName);
    }
  };
};

if (process.env.NODE_ENV === 'development') {
  const element = document.querySelector('#_auth-dev-root');

  if (element) {
    mount(element, {
      onNavigate: () => {},
      defaultHistory: createBrowserHistory()
    });
  }
}

export { mount };
