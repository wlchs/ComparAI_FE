import React from 'react';
import './styles.css';
import propTypes from 'prop-types';
import * as classnames from 'classnames';

const ButtonComponent = props => {
  return (
    <div onClick={props.onClick}
      className={
        classnames('button text',
                   props.type,
                   props.className,
                   props.small ? 'small' : null
                  )}>
      {props.text}
    </div>
  );
};

ButtonComponent.propTypes = {
  onClick: propTypes.func.isRequired,
  text: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  className: propTypes.string,
};

export default ButtonComponent;
