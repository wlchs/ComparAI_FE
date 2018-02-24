import React, { Component } from 'react';
import axios from 'axios';
import __PATH from '../environments';

import Navbar from '../components/Navbar';
import CategoryCard from '../components/CategoryCard';

export default class Categories extends Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };

    this.access_token = sessionStorage.getItem('access_token');
    this.loadContent = this.loadContent.bind(this);
    this.populateCategories = this.populateCategories.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  componentDidMount() {
    if (!sessionStorage.getItem('access_token')) {
      this.props.history.push('/');
    }

    this.loadContent();
  }

  loadContent() {
    this.props.toggleLoading(true);

    axios.get(`${__PATH}/getImagesByCategory/`,{
      headers: {'Authorization': `Bearer: ${this.access_token}`}
    })
      .then(response => {
        console.log(response);
        this.handleResponse(response.data.images);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.props.toggleLoading(false));
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

    this.populateCategories();
  }

  populateCategories() {
    let categories = {};

    this.props.images.forEach(
      image => {
        image.categories.forEach(
          categoryProvider => {
            categoryProvider.categories.forEach(
              category => {
                if (!categories[category]) {
                  categories[category] = [];
                }
                if (!categories[category].includes(image.data)) {
                  categories[category].push(image.data);
                }
              }
            );
          }
        );
      }
    );

    const categoryArray = Object.keys(categories).map(category => {
      return {category: category, images: categories[category]};
    });

    this.setState(state => {
      return state.categories === categoryArray ? null : {categories: categoryArray};
    });
  }

  changeCategory(categoryName) {
    this.props.changeCategory(categoryName);
    this.props.history.push('/photos');
  }

  render() {

    return (
      <div>
        <Navbar />
        <div className="images">
          {this.state.categories.map(category =>
            <CategoryCard key={category.category}
              name={category.category}
              images={category.images}
              onClick={this.changeCategory} />
          )}
        </div>
      </div>
    );
  }
}
