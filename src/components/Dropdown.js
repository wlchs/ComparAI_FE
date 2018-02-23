import React, { Component } from 'react';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
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

  showDropdown() {
    this.setState({
      visible: true
    });
  }

  hideDropdown() {
    console.log('mivanma');
    this.setState({
      visible: false
    });
  }

  render() {
    console.log(this.props.categories);

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
        )}
      </div>;

    return (
      <div className="filter small button" onClick={this.showDropdown} ref={this.setWrapperRef}>
        <div className="center">
          {this.props.selectedCategory ? this.props.selectedCategory : "Összes kategória"}
        </div>
        <div className="filter dropdown"></div>
        {this.state.visible ? list : null}
      </div>
    );
  }
};
