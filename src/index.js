import React from 'react';
import ReactDOM from 'react-dom';
import './static/styles.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ImageReducer from './reducers/image';

const store = createStore(
  ImageReducer,
  window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();


/*

<div id="notification_container">
  <div id="notification" className="error">Hibás felhasználónév vagy jelszó!</div>
</div>

*/
