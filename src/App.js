import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import UserReducer from './reducers/user';

import Login from './views/Login';

const store = createStore(
  UserReducer
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Redirect exact from='/' to='/login'/>
            <Route path='/login' component={Login}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
