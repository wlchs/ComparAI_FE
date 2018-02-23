import React, { Component } from 'react';

export default class LogoutComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.resetToken();
    sessionStorage.removeItem('access_token');
    this.props.history.push('/');
  }

  render() {
    return (
      <div>Logout!</div>
    );
  }
};
