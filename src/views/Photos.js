import React, { Component } from 'react';

import MenubarComponent from '../components/MenubarComponent';
import ImageCardComponent from '../components/ImageCardComponent';

export default class Photos extends Component {

  constructor(props) {
    super(props);

    this.access_token = sessionStorage.getItem('access_token');
    this.uploadNew = this.uploadNew.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
    if (!this.access_token) {
      this.props.history.push('/');
    }

    if (!this.props.images.length) {
      this.props.loadContent();
    }
  }

  uploadNew(imageFile) {
    this.props.toggleLoading(true);
    this.props.uploadImage(imageFile, this.props.history)
      .then(action => this.props.dispatch(action))
      .finally(() => this.props.toggleLoading(false));
  }

  deleteSelected() {
    const id = this.props.images.filter(image => image.selected)
      .map(image => image.id);

    if (!id.length) {
      return this.props.sendNotification({
        text: 'Nincs kijelölt kép!',
        type: 'warning'
      });
    }

    const data = { id };

    this.props.toggleLoading(true);
    this.props.deleteImages(data, this.props.history)
      .then(action => this.props.dispatch(action))
      .finally(() => this.props.toggleLoading(false));
  }

  containsCategory(image, selectedCategory) {
    return image.categories.some(categoryProvider =>
      (selectedCategory === "" || categoryProvider.categories
          .map(category => category.name)
          .includes(selectedCategory)
        )
      );
  }

  navigate(id) {
    this.props.history.push(`/compare/${id}`);
  }

  render() {

    let categories = {};
    this.props.images.forEach(
      image => {
        let categorySet = new Set();

        image.categories.forEach(
          imageService => imageService.categories.forEach(
            label => {
              categorySet.add(label.name);
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

    const filteredImages = this.props.images.filter(image => {
      return this.containsCategory(image, this.props.selectedCategory);
    });

    return (
      <div>
        <MenubarComponent
          selectedCategory={this.props.selectedCategory}
          changeCategory={this.props.changeCategory}
          categories={categories}
          uploadNew={this.uploadNew}
          deleteSelected={this.deleteSelected}
          sendNotification={this.props.sendNotification} />
        <div className="images">
          {filteredImages.map(image =>
            <ImageCardComponent key={image.id}
              id={image.id}
              date={image.date.split('T')[0]}
              img={image.data}
              selectImage={this.props.selectImage}
              selected={image.selected}
              navigate={() => this.navigate(image.id)} />
          )}
        </div>
      </div>
    );
  }
}
