import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Login from './views/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from='/' to='/login'/>
          <Route path='/login' component={Login}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
