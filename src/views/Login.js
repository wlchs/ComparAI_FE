import React, { Component } from 'react';
import __PATH from '../environments';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: undefined,
      password: undefined
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      ...this.state,
      email: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      ...this.state,
      password: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(`${__PATH}/auth`, {
      userId: this.state.email,
      password_hash: this.state.password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <form className="login" onSubmit={this.handleSubmit}>
          <div className="username_container">
            <p className="text">E-mail:</p>
            <input type="email"
              className="text_field"
              onChange={this.handleEmailChange}
              required />
          </div>
          <div className="password_container">
            <p className="text">Jelszó:</p>
            <input type="password"
              className="text_field"
              onChange={this.handlePasswordChange}
              required />
          </div>
          <input type="submit"
            value="Bejelentkezés"
            className="login_button button text success" />
        </form>
      </div>
    );
  }
}

export default Login;
