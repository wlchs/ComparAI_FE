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
    const file = event.target.files;
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
          Új képek hozzáadása
          <input type="file"
            id="file"
            ref="fileUploader"
            style={{display: "none"}}
            onChange={this.sendFile}
            accept="image/*"
            multiple />
        </div>
        <div className="small button error text" onClick={this.props.deleteSelected}>
          Kijelöltek törlése
        </div>
      </div>
    );
  }
};
