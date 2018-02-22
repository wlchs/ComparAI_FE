import React, { Component } from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActionCreators from '../actions/user';

import LoginFormComponent from '../components/LoginFormComponent';

class Login extends Component {

  static propTypes = {
    user: propTypes.object.isRequired
  };

  render() {
    const {dispatch, user} = this.props;
    const setToken = bindActionCreators(UserActionCreators.setToken, dispatch);
    const resetToken = bindActionCreators(UserActionCreators.resetToken, dispatch);

    return (
      <LoginFormComponent
        setToken={setToken} />
    );
  }
}

const mapStateToProps = state => ({
  user: state
});


export default connect(mapStateToProps)(Login);
