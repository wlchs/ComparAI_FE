import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import CategoryCard from '../components/CategoryCard';

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
