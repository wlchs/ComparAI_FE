import React, { Component } from 'react';

import Dropdown from './Dropdown';

export default class Menubar extends Component {
  constructor(props) {
    super(props);

    this.openUploader = this.openUploader.bind(this);
    this.sendFile = this.sendFile.bind(this);
  }

  openUploader() {
    this.refs.fileUploader.click();
  }

  sendFile(event) {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    this.props.uploadNew(file);
  }

  render() {
    return (
      <div className="menu_bar">
        <Dropdown
          selectedCategory={this.props.selectedCategory}
          categories={this.props.categories}
          changeCategory={this.props.changeCategory} />
        <div className="small button success text" onClick={this.openUploader}>
          Új kép hozzáadása
          <input type="file"
            id="file"
            ref="fileUploader"
            style={{display: "none"}}
            onChange={this.sendFile}
            accept="image/*" />
        </div>
        <div className="small button error text">
          Kijelöltek törlése
        </div>
      </div>
    );
  }
};
