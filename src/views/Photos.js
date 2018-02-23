import React, { Component } from 'react';
import axios from 'axios';
import __PATH from '../environments';

import Navbar from '../components/Navbar';
import Menubar from '../components/Menubar';
import ImageCard from '../components/ImageCard';

export default class Photos extends Component {

  constructor(props) {
    super(props);

    this.access_token = sessionStorage.getItem('access_token');
    this.loadContent = this.loadContent.bind(this);
    this.selectImage = this.selectImage.bind(this);
  }

  componentDidMount() {
    if (!sessionStorage.getItem('access_token')) {
      this.props.history.push('/');
    }

    this.loadContent();
  }

  loadContent() {
    this.imagesRequest = axios.get(`${__PATH}/getImagesByCategory/${this.props.selectedCategory}`,{
      headers: {'Authorization': `Bearer: ${this.access_token}`}
    })
      .then(response => {
        console.log(response);
        this.handleResponse(response.data.images);
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleResponse(imageArray) {
    this.props.removeAll();

    imageArray.forEach(image => {
      if(!this.props.images.includes(image)) {
        const imageFormat = image.contentType;
        const data = new Buffer(image.data, 'binary').toString('base64');
        this.props.addImage({
          ...image,
          selected: false,
          data: `data:${imageFormat};base64,${data}`
        });
      }
    });
  }

  selectImage(imageId) {
    let selected = this.props.images.filter(image => {
      return image.id === imageId;
    })[0];
    const id = this.props.images.indexOf(selected);

    selected = {
      ...selected,
      selected: !selected.selected
    }

    this.props.modifyImage(selected, id);
  }

  render() {

    let categories = {};
    this.props.images.forEach(
      image => {
        let categorySet = new Set();

        image.categories.forEach(
          imageService => imageService.categories.forEach(
            label => {
              categorySet.add(label);
            }
          )
        );

        categorySet.forEach(
          label => categories[label] = categories[label] + 1 || 1
        );
      }
    );

    categories = Object.keys(categories).map(key => {
      return {name: key, count: categories[key]};
    });

    return (
      <div>
        <Navbar />
        <Menubar
          selectedCategory={this.props.selectedCategory}
          changeCategory={this.props.changeCategory}
          categories={categories}/>
        <div className="images">
          {this.props.images.map(image =>
            <ImageCard key={image.id}
              id={image.id}
              name={image.name}
              date={image.date.split('T')[0]}
              img={image.data}
              selectImage={this.selectImage}
              selected={image.selected} />
          )}
        </div>
      </div>
    );
  }
}
