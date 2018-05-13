import React from 'react';
import './styles.css';

import ButtonComponent from '../ButtonComponent';

const LoginFormComponent = props => {
  return (
    <div className='login'>
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
      <ButtonComponent
        type='success'
        className='login_button'
        onClick={props.handleSubmit}>
        Bejelentkezés
      </ButtonComponent>
      <ButtonComponent
        type='error'
        className='register_button'
        onClick={() => props.history.push('/register')}>
        Regisztráció
      </ButtonComponent>
    </div>
  );
};

export default LoginFormComponent;
