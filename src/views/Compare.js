import React, { Component } from 'react';
import axios from 'axios';
import __PATH from '../environments';

import Navbar from '../components/Navbar';

export default class Compare extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hqImage: undefined
    };

    this.access_token = sessionStorage.getItem('access_token');
    this.loadContent = this.loadContent.bind(this);
    this.downloadHighQualityVersion = this.downloadHighQualityVersion.bind(this);
    this.handleHQResponse = this.handleHQResponse.bind(this);
    this.navigate = this.navigate.bind(this);
    this.toPhotos = this.toPhotos.bind(this);
  }

  componentDidMount() {
    if (!this.access_token) {
      this.props.history.push('/');
    }

    if (!this.props.images.length) {
      this.loadContent();
    }
  }

  loadContent() {
    this.props.toggleLoading(true);

    axios.get(`${__PATH}/getImagesByCategory/`, {
      headers: {'Authorization': `Bearer: ${this.access_token}`}
    })
      .then(response => {
        console.log(response);
        this.handleResponse(response.data.images);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.props.toggleLoading(false);
      });
  }

  handleResponse(imageArray) {
    this.props.removeAll();

    imageArray.forEach(image => {
      if(!this.props.images.includes(image)) {
        const imageFormat = image.contentType;
        const data = new Buffer(image.thumbnail, 'binary').toString('base64');
        this.props.addImage({
          ...image,
          selected: false,
          data: `data:${imageFormat};base64,${data}`
        });
      }
    });
  }

  downloadHighQualityVersion(id) {
    axios.get(`${__PATH}/getImageById/${id}`, {
      headers: {'Authorization': `Bearer: ${this.access_token}`}
    })
      .then(response => {
        console.log(response);
        this.handleHQResponse(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleHQResponse(image) {
    const imageFormat = image.contentType;
    const data = new Buffer(image.data, 'binary').toString('base64');
    this.setState({hqImage: `data:${imageFormat};base64,${data}`});
  }

  navigate(newId) {
    let id = newId;
    if (newId < 0) id = this.props.images.length - 1;
    else if (newId >= this.props.images.length) id = 0;
    this.setState({hqImage: undefined});
    this.loading = false;

    this.props.history.push(`/compare/${this.props.images[id].id}`);
  }

  toPhotos(category) {
    this.props.changeCategory(category);
    this.props.history.push('/photos');
  }

  render() {
    let selectedId = 0;

    if (this.props.match.params.id) {
      const id = this.props.images.map(image => image.id)
        .indexOf(this.props.match.params.id);

      selectedId = id;
    }

    const selectedImage = this.props.images[selectedId];
    if (!this.loading && !this.state.hqImage && selectedImage) {
      this.loading = true;
      this.downloadHighQualityVersion(selectedImage.id);
    }

    return (
      <div>
        <Navbar />
        {selectedImage ?
          <div className="container">
            <div className="nav_arrow left" onClick={() => this.navigate(selectedId-1)}>&lt;</div>
            <div className="central_container">
              <img className="big_image" src={this.state.hqImage || selectedImage.data} alt={selectedImage.name} />
                <div className="info">
                  <div className="info_row">Név: <b>{selectedImage.name}</b></div>
                  <div className="info_row">Dátum: {selectedImage.date.split('T')[0]}</div>
                  {selectedImage.categories.map(categoryProvider =>
                    <ul key={categoryProvider.name}>
                      <b>{categoryProvider.name.toUpperCase()} kategóriák:</b>
                      {categoryProvider.categories.map(category =>
                        <li key={category} onClick={() => this.toPhotos(category)}>{category}</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            <div className="nav_arrow right" onClick={() => this.navigate(selectedId+1)}>&gt;</div>
          </div>
          : null}
      </div>
    );
  }
}
