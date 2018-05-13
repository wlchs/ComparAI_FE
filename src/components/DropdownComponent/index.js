import React, { Component } from 'react';
import './styles.css';

export default class DropdownComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState(state => {
        return this.state.visible ? {visible: false} : null;
      });
    }
  }

  toggleDropdown() {
    if (!this.state.visible && !this.props.selectedCategory) {
      this.props.sendNotification({
        text: 'Kategória szerinti szűréshez kérem használja a "Kategóriák" menüpontot!',
        type: 'warning'
      });
      return;
    }
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const list =
      <div className="dropdown_frame">
          {this.props.selectedCategory ?
            <div>
              <div className="dropdown_element"
                onClick={() => {
                  this.props.changeCategory("");
                }} >Összes kategória</div>
              <div key={this.props.selectedCategory} className="dropdown_element"
                onClick={() => {
                  this.props.changeCategory(this.props.selectedCategory);
                }} >{this.props.selectedCategory}
              </div>
            </div> : null}
      </div>;

    return (
      <div className="filter small button" onClick={this.toggleDropdown} ref={this.setWrapperRef}>
        <div className="center">
          {this.props.selectedCategory ? this.props.selectedCategory : "Összes kategória"}
        </div>
        <div className="filter dropdown"></div>
        {this.state.visible ? list : null}
      </div>
    );
  }
};
