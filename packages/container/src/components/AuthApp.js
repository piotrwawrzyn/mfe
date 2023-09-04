import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: nextPathName => {
        const pathname = history.location;

        if (pathname !== nextPathName) history.push(nextPathName);
      },
      onSignIn,
      initialPath: history.location.pathname
    });

    history.listen(({ pathname }) => onParentNavigate(pathname));
  }, []);

  return <div ref={ref} />;
};
