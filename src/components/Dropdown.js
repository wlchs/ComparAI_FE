import React, { Component } from 'react';

export default class Dropdown extends Component {
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
    this.setState({
      visible: !this.state.visible
    });
  }

  compare(a, b) {
    return a.key.toUpperCase() > b.key.toUpperCase() ? 1 :
      b.key.toUpperCase() > a.key.toUpperCase() ? -1 : 0;
  }

  render() {
    const list =
      <div className="dropdown_frame">
        <div className="dropdown_element"
          onClick={() => {
            this.props.changeCategory("");
          }} >Összes kategória</div>
        {this.props.categories.map(category =>
          <div key={category.name} className="dropdown_element"
            onClick={() => {
              this.props.changeCategory(category.name);
            }} >{category.name}</div>
        ).sort(this.compare)}
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
