import React, { Component } from 'react';
import axios from 'axios';
import __PATH from '../environments';

import Navbar from '../components/Navbar';
import RegisterFormComponent from '../components/RegisterFormComponent';

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: undefined,
      password: undefined,
      code: undefined
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleCode = this.handleCode.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  login() {
    this.props.history.push('/login');
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(`${__PATH}/register`, {
      userId: this.state.email,
      password_hash: this.state.password,
      code: this.state.code
    })
    .then(response => {
      console.log(response);
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

  handleCode(event) {
    this.setState({
      code: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Navbar disabled/>
        <RegisterFormComponent
          handleEmail={this.handleEmail}
          handlePassword={this.handlePassword}
          handleCode={this.handleCode}
          handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
