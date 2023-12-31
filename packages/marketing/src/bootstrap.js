import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

const mount = (element, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory || createMemoryHistory({ initialEntries: [initialPath] });

  history.listen(({ pathname }) => {
    onNavigate(pathname);
  });

  ReactDOM.render(<App history={history} />, element);

  return {
    onParentNavigate(nextPathName) {
      if (nextPathName !== history.location.pathname)
        history.push(nextPathName);
    }
  };
};

if (process.env.NODE_ENV === 'development') {
  const element = document.querySelector('#_marketing-dev-root');

  if (element) {
    mount(element, {
      onNavigate: () => {},
      defaultHistory: createBrowserHistory(),
      initialPath: ''
    });
  }
}

export { mount };
