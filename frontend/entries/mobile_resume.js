import React from 'react';
import ReactDOM from 'react-dom';
import ResumeMobileShare from 'SHARED/components/ResumeMobileComponent';
import 'SRC/vendor/shared/loading.css';

const renderApp = (domId, props = {}) => {
  const DOM = document.getElementById(domId);
  ReactDOM.render(
    <ResumeMobileShare {...props} />,
    DOM
  );
};

$(() => {
  renderApp('resume', {
    hash: window.resumeHash,
    login: window.login
  });
});
