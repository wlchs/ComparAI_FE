import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import LoginFormComponent from '../components/LoginFormComponent';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: undefined,
      password: undefined
    };

    this.access_token = sessionStorage.getItem('access_token');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  componentDidMount() {
    if (this.access_token) {
      this.login();
    } else {
      this.props.clearCache();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state)
      .then(() => this.props.history.push('/photos'))
      .catch(err => console.log(err));
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Navbar disabled/>
        <LoginFormComponent
          handleEmail={this.handleEmail}
          handlePassword={this.handlePassword}
          handleSubmit={this.handleSubmit}
          history={this.props.history} />
      </div>
    );
  }
}
