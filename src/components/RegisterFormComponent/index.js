import React from 'react';
import './styles.css';
import '../LoginFormComponent/styles.css';

const RegisterFormComponent = props => {
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
      <div className="code_container">
        <p className="text">Kód:</p>
        <input type="text"
          className="text_field"
          onChange={props.handleCode}
          required />
      </div>
      <input type="submit"
        value="Regisztráció"
        className="login_button button text error" />
    </form>
  );
};

export default RegisterFormComponent;
