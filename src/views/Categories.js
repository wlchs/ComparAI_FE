import React, { Component } from 'react';

import CategoryCardComponent from '../components/CategoryCardComponent';

export default class Categories extends Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };

    this.access_token = sessionStorage.getItem('access_token');
    this.populateCategories = this.populateCategories.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  componentDidMount() {
    if (!this.access_token) {
      this.props.history.push('/');
    }

    if (!this.props.images.length) {
      this.props.loadContent();
    } else {
      this.populateCategories();
    }
  }

  componentDidUpdate() {
    if (this.props.images.length && !this.state.categories.length) {
      this.populateCategories();
    }
  }

  populateCategories() {
    let categories = {};

    this.props.images.forEach(
      image => {
        image.categories.forEach(
          categoryProvider => {
            categoryProvider.categories.forEach(
              category => {
                if (!categories[category.name]) {
                  categories[category.name] = [];
                }
                if (!categories[category.name].includes(image.data)) {
                  categories[category.name].push(image.data);
                }
              }
            );
          }
        );
      }
    );

    let categoryArray = Object.keys(categories).map(category => {
      return {category: category, images: categories[category]};
    }).filter(category => {
      return (category.images.length >= this.props.images.length * 0.1);
    });

    categoryArray.sort(
      (a, b) =>
        (a.images.length < b.images.length ? 1
           : b.images.length < a.images.length ? -1 : 0
        )
    );

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
      <div className="images">
        {this.state.categories.map(category =>
          <CategoryCardComponent key={category.category}
            name={category.category}
            images={category.images}
            onClick={this.changeCategory} />
        )}
      </div>
    );
  }
}
