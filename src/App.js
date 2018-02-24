import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ImageActionCreators from './actions/image';

import Login from './views/Login';
import Logout from './views/Logout';
import Photos from './views/Photos';
import Categories from './views/Categories';

class App extends Component {
  static propTypes = {
    images: propTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selectedCategory: ""
    }

    this.changeCategory = this.changeCategory.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  changeCategory(categoryName) {
    this.setState(state => {
      return this.state.selectedCategory === categoryName ?
        null : {...state, selectedCategory: categoryName};
    });
  }

  toggleLoading(loading) {
    this.setState(state => {
      return state.loading !== loading ? {...state, loading } : null;
    });
  }

  render() {

    const {dispatch, images} = this.props;
    const addImage = bindActionCreators(ImageActionCreators.addImage, dispatch);
    const modifyImage = bindActionCreators(ImageActionCreators.modifyImage, dispatch);
    const removeImage = bindActionCreators(ImageActionCreators.removeImage, dispatch);
    const removeAll = bindActionCreators(ImageActionCreators.removeAll, dispatch);

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Redirect exact from='/' to='/login'/>

            <Route path='/login' render={ props => (
              <Login {...props} />
            )}/>

            <Route path='/logout' render={ props => (
              <Logout {...props} />
            )}/>

            <Route path='/photos' render={ props => (
              <Photos {...props}
                changeCategory={this.changeCategory}
                selectedCategory={this.state.selectedCategory}
                images={images}
                addImage={addImage}
                modifyImage={modifyImage}
                removeImage={removeImage}
                removeAll={removeAll}
                toggleLoading={this.toggleLoading} />
            )}/>

            <Route path='/categories' render={ props => (
              <Categories {...props}
                changeCategory={this.changeCategory}
                images={images}
                addImage={addImage}
                removeAll={removeAll}
                toggleLoading={this.toggleLoading} />
            )}/>

          </Switch>
        </BrowserRouter>
        {this.state.loading ?
          <div className="loadingSpinner">
            <PulseLoader
              color={'#F0F0F0'}
              size={50}
            />
            <div>Loading...</div>
          </div>
        : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  images: state
});


export default connect(mapStateToProps)(App);
