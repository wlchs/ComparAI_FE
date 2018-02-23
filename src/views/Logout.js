import React, { Component } from 'react';

class Logout extends Component {
  componentDidMount() {
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
