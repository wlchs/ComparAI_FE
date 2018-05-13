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
        text='Bejelentkezés'
        type='success'
        className='login_button'
        onClick={props.handleSubmit} />
      <ButtonComponent
        text='Regisztráció'
        type='error'
        className='register_button'
        onClick={() => props.history.push('/register')} />
    </div>
  );
};

export default LoginFormComponent;
