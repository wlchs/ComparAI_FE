import React, { Component } from 'react';
import axios from 'axios';
import __PATH from '../environments';

export default class LoginFormComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: undefined,
      password: undefined
    };

    console.log(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(`${__PATH}/auth`, {
      userId: this.state.email,
      password_hash: this.state.password
    })
    .then(response => {
      console.log(response);
      this.props.setToken(response.data.token);
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
      <form className="login" onSubmit={this.handleSubmit}>
        <div className="username_container">
          <p className="text">E-mail:</p>
          <input type="email"
            className="text_field"
            onChange={this.handleEmail}
            required />
        </div>
        <div className="password_container">
          <p className="text">Jelszó:</p>
          <input type="password"
            className="text_field"
            onChange={this.handlePassword}
            required />
        </div>
        <input type="submit"
          value="Bejelentkezés"
          className="login_button button text success" />
      </form>
    );
  }
};
