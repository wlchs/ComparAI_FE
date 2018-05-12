import React, { Component } from 'react';

import Navbar from '../components/Navbar';

export default class Evaluate extends Component {
  constructor(props) {
    super(props);

    this.access_token = sessionStorage.getItem('access_token');
    this.loadHQContent = this.loadHQContent.bind(this);
  }

  componentDidMount() {
    if (!this.access_token) {
      this.props.history.push('/');
    }

    if (!this.props.images.length) {
      this.props.loadContent();
    }
  }

  loadHQContent(id) {
    this.id = id;
    this.hqImageActualized = true;
    this.props.downloadOriginalImage(id, this.props.history)
      .then(action => this.props.dispatch(action))
      .catch(err => console.log(err));
  }

  render() {
    let selectedImage;
    let selectedProvider;
    let selectedLabel;

    this.props.images.forEach(img => {
      img.categories.forEach(catProvider => {
        catProvider.categories.forEach(cat => {
          if (!cat.decision) {
            selectedImage = img;
            selectedProvider = catProvider.name;
            selectedLabel = cat.name;
          }
        });
      });
    });

    return (
      <div>
        <Navbar />
        {selectedImage ?
          <div className="container">
            <div></div>
            <div className="central_container">
              <img className="big_image" src={selectedImage.data} alt={selectedImage.name} />
              <div className="info">
                <div className="info_row">Név: <b>{selectedImage.name}</b></div>
                <div className="info_row">Dátum: {selectedImage.date.split('T')[0]}</div>
              </div>
              <div className="categories">
                {selectedLabel}
              </div>
            </div>
            <div></div>
          </div>
          : null}
      </div>
    );
  }
}
