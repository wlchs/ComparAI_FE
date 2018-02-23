import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActionCreators from './actions/user';

import Login from './views/Login';
import Logout from './views/Logout';
import Photos from './views/Photos';

class App extends Component {

  static propTypes = {
    user: propTypes.object.isRequired
  };

  render() {

    const {dispatch, user} = this.props;
    const setToken = bindActionCreators(UserActionCreators.setToken, dispatch);
    const resetToken = bindActionCreators(UserActionCreators.resetToken, dispatch);

    return (
        <BrowserRouter>
          <Switch>
            <Redirect exact from='/' to='/login'/>

            <Route path='/login' render={ props => (
              <Login {...props} setToken={setToken}/>
            )}/>

            <Route path='/logout' render={ props => (
              <Logout {...props} resetToken={resetToken}/>
            )}/>

            <Route path='/photos' component={Photos}/>

          </Switch>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state
});


export default connect(mapStateToProps)(App);
