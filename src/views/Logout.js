import React, { Component } from 'react';

class Logout extends Component {
  componentDidMount() {
    sessionStorage.removeItem('access_token');
    this.props.sendNotification({
      text: 'Sikeres kijelentkezés!',
      type: 'success'
    });
    this.props.history.push('/');
  }

  render() {
    return (
      <div>Logout!</div>
    );
  }
}

export default Logout;
