import React, { Component } from 'react';
import axios from 'axios';
import __PATH from '../environments';

import Navbar from '../components/Navbar';
import Menubar from '../components/Menubar';
import ImageCard from '../components/ImageCard';

export default class Photos extends Component {

  constructor(props) {
    super(props);

    const img = <img src='http://via.placeholder.com/350x150' />;

    this.state = {
      img: img
    };

    this.access_token = sessionStorage.getItem('access_token');

    this.selectImage = this.selectImage.bind(this);
  }

  componentDidMount() {
    if (!sessionStorage.getItem('access_token')) {
      this.props.history.push('/');
    }

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

    /*this.categoryListRequest = axios.get(`${__PATH}/getImageById/5a8f03dc1abdda551aa19b0f`,{
      headers: {'Authorization': `Bearer: ${this.access_token}`},
      responseType: 'arraybuffer'
    })
      .then(response => {
        const header = response.headers["content-type"];
        const data = new Buffer(response.data, 'binary').toString('base64');
        return `data:${header};base64,${data}`;
      })
      .then(encoded => this.setState({
        img: <img src={encoded} />
      }))
      .catch(err => {
        console.log(err);
      });
    */
  }

  handleResponse(imageArray) {
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
    return (
      <div>
        <Navbar />
        <Menubar />
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
