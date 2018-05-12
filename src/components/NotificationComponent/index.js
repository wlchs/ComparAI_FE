import React from 'react';
import './styles.css';

const NotificationComponent = props => {
  if (props.enabled) {
    setTimeout(() => props.hide(), 3000);
    switch (props.type) {
      case 'error': return (
        <div className="notification error">{props.text}</div>
      );
      case 'warning': return (
        <div className="notification warning">{props.text}</div>
      );
      case 'info': return (
        <div className="notification info">{props.text}</div>
      );
      case 'success': return (
        <div className="notification success">{props.text}</div>
      );
      default: return null;
    }
  }
  else {
    return null;
  }
};

export default NotificationComponent;
