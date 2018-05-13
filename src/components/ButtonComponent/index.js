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
      {props.children}
    </div>
  );
};

ButtonComponent.propTypes = {
  onClick: propTypes.func.isRequired,
  type: propTypes.string.isRequired,
  className: propTypes.string,
  children: propTypes.any
};

export default ButtonComponent;
