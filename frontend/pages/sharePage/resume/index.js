/* eslint global-require: "off" */

import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React);
}

import ResumeShare from './container';

const renderApp = (domId, props) => {
  const DOM = document.getElementById(domId);
  ReactDOM.render(
    <ResumeShare {...props} />,
    DOM
  );
};

export default renderApp;
