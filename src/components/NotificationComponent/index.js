import React, { Component } from 'react';
import './styles.css';

class NotificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: undefined
    };

    this.hide = this.hide.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.timer && this.props.remaining > 0) {
      this.setState({
        timer: setInterval(this.props.time, 1000)
      });
    } else if (this.state.timer && this.props.remaining <= 0) {
      clearInterval(this.state.timer);
      this.setState({
        timer: undefined
      });
    }
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({
        timer: undefined
      });
    }
  }

  hide() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.props.hide();
      this.setState({
        timer: undefined
      });
    }
  }

  render() {
    if (this.props.remaining > 0) {
      switch (this.props.type) {
        case 'error': return (
          <div className="notification error"
            onClick={this.hide} >{this.props.text}</div>
        );
        case 'warning': return (
          <div className="notification warning"
            onClick={this.hide} >{this.props.text}</div>
        );
        case 'info': return (
          <div className="notification info"
            onClick={this.hide} >{this.props.text}</div>
        );
        case 'success': return (
          <div className="notification success"
            onClick={this.hide} >{this.props.text}</div>
        );
        default: return null;
      }
    }
    else {
      return null;
    }
  }
};

export default NotificationComponent;
