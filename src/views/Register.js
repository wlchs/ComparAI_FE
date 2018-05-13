import React, { Component } from 'react';

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

  handleSubmit(event) {
    event.preventDefault();
    this.props.register(this.state)
      .then(() => this.props.history.push('/login'))
      .catch(err => {});
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
      <RegisterFormComponent
        handleEmail={this.handleEmail}
        handlePassword={this.handlePassword}
        handleCode={this.handleCode}
        handleSubmit={this.handleSubmit}/>
    );
  }
}
