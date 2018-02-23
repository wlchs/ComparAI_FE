import React from 'react';

const LoginFormComponent = props => {
  return (
    <form className="login" onSubmit={props.handleSubmit}>
      <div className="username_container">
        <p className="text">E-mail:</p>
        <input type="email"
          className="text_field"
          onChange={props.handleEmail}
          required />
      </div>
      <div className="password_container">
        <p className="text">Jelszó:</p>
        <input type="password"
          className="text_field"
          onChange={props.handlePassword}
          required />
      </div>
      <input type="submit"
        value="Bejelentkezés"
        className="login_button button text success" />
    </form>
  );
};

export default LoginFormComponent;
