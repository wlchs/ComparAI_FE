import React, { Component } from 'react';
import axios from 'axios';
import __PATH from '../environments';

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
    }
  }

  login() {
    this.props.history.push('/photos');
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(`${__PATH}/auth`, {
      userId: this.state.email,
      password_hash: this.state.password
    })
    .then(response => {
      console.log(response);
      sessionStorage.setItem('access_token', response.data.token);
      this.login();
    })
    .catch(err => {
      console.log(err);
      // notification
    });
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
      <LoginFormComponent
        handleEmail={this.handleEmail}
        handlePassword={this.handlePassword}
        handleSubmit={this.handleSubmit}/>
    );
  }
}
