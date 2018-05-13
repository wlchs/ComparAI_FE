import React from 'react';
import './styles.css';
import propTypes from 'prop-types';

const ButtonComponent = props => {
  if (props.small) {
    switch (props.type) {
      case 'success':
        return (
          <div onClick={props.onClick}
            className="register_button small button text success">
            {props.text}
          </div>
        );
      case "error":
        return (
          <div onClick={props.onClick}
            className="register_button small button text error">
            {props.text}
          </div>
        );
      default:
        return (
          <div onClick={props.onClick}
            className="register_button small button text">
            {props.text}
          </div>
        );
    }
  }
  switch (props.type) {
    case 'success':
      return (
        <div onClick={props.onClick}
          className="register_button button text success">
          {props.text}
        </div>
      )
    case 'error':
      return (
        <div onClick={props.onClick}
          className="register_button button text error">
          {props.text}
        </div>
      );
    default:
      return (
        <div onClick={props.onClick}
          className="register_button button text">
          {props.text}
        </div>
      );
  }
};

ButtonComponent.propTypes = {
  onClick: propTypes.func.isRequired,
  text: propTypes.string.isRequired,
  type: propTypes.string.isRequired
};

export default ButtonComponent;
