import React, { Component } from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActionCreators from '../actions/user';

import LogoutComponent from '../components/LogoutComponent';

class Logout extends Component {

  static propTypes = {
    user: propTypes.object.isRequired
  };

  render() {
    const {dispatch, user} = this.props;
    const resetToken = bindActionCreators(UserActionCreators.resetToken, dispatch);

    return (
      <LogoutComponent
        user={this.props.user}
        resetToken={resetToken}
        history={this.props.history} />
    );
  }
}

const mapStateToProps = state => ({
  user: state
});


export default connect(mapStateToProps)(Logout);
