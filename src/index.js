import React from 'react';
import ReactDOM from 'react-dom';
import './static/styles.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div>
    <App />
    <div id="notification_container">
      <div id="notification" className="error">Hibás felhasználónév vagy jelszó!</div>
    </div>
  </div>, document.getElementById('root'));
registerServiceWorker();
