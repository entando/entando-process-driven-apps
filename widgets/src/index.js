import React from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import App from 'components/App/App';
import 'i18n';
import 'index.css';

// insert the custom elements to the scope
import 'custom-elements/TaskListElement';

// We only want to show the App demo in DEV mode.
if (process.env.REACT_APP_LOCAL === 'true') {
  i18next.changeLanguage('en');
  ReactDOM.render(<App />, document.getElementById('root'));
}