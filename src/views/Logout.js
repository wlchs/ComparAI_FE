import React, { Component } from 'react';

class Logout extends Component {
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
}

export default Logout;
