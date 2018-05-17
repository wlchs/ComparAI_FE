import React, { Component } from 'react';

export default class Compare extends Component {
  constructor(props) {
    super(props);

    this.access_token = sessionStorage.getItem('access_token');
    this.loadHQContent = this.loadHQContent.bind(this);
    this.navigate = this.navigate.bind(this);
    this.toPhotos = this.toPhotos.bind(this);
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
      .catch(err => {});
  }

  navigate(newId) {
    let id = newId;
    if (newId < 0) id = this.props.images.length - 1;
    else if (newId >= this.props.images.length) id = 0;
    this.hqImageActualized = false;

    this.props.history.push(`/compare/${this.props.images[id].id}`);
  }

  toPhotos(category) {
    this.props.changeCategory(category);
    this.props.history.push('/photos');
  }

  render() {
    let selectedId = 0;
    if (this.props.match.params.id) {
      selectedId = this.props.images.map(image => image.id)
        .indexOf(this.props.match.params.id);
    }

    let selectedImage = this.props.images[selectedId];
    if (selectedImage) {
      if (this.id !== selectedImage.id) {
        this.hqImageActualized = false;
      }
      if (!this.hqImageActualized) {
        this.loadHQContent(selectedImage.id);
      }
      if (this.props.hqImage.id === selectedImage.id) {
        selectedImage = {...selectedImage, data: this.props.hqImage.src};
      }
    }

    return (
      <div>
        {selectedImage ?
          <div className="container">
            <div className="nav_arrow left" onClick={() => this.navigate(selectedId-1)}>&lt;</div>
            <div className="central_container">
              <img className="big_image" src={selectedImage.data} alt={selectedImage.name} />
              <div className="info">
                <div className="info_row">Név: <b>{selectedImage.name}</b></div>
                <div className="info_row">Dátum: {selectedImage.date.split('T')[0]}</div>
              </div>
              <div className="categories">
                {selectedImage.categories
                  .filter(categoryProvider => categoryProvider.categories.length)
                  .map(categoryProvider =>
                  <ul key={categoryProvider.name}>
                    <b>{categoryProvider.name.toUpperCase()}</b>
                    {categoryProvider.categories.map(category =>
                      <li key={category.name + categoryProvider.categories.indexOf(category)}
                        onClick={() => this.toPhotos(category.name)}>
                        <div className="name">{category.name}</div><div>&nbsp;-&nbsp;{(category.score*100).toFixed(0)}%</div>
                      </li>
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


/*

{selectedImage.categories.map(categoryProvider =>
  <ul key={categoryProvider.name}>
    <b>{categoryProvider.name.toUpperCase()} kategóriák:</b>
    {categoryProvider.categories.map(category =>
      <li key={category.name}
        onClick={() => this.toPhotos(category.name)}>
        {category.name} - {(category.score*100).toFixed(2)}%
      </li>
    )}
  </ul>
)}

*/
