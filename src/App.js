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
import Compare from './views/Compare';

class App extends Component {
  static propTypes = {
    images: propTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }

    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggleLoading(loading) {
    this.setState(state => {
      return state.loading !== loading ? {...state, loading } : null;
    });
  }

  render() {

    const {dispatch, images} = this.props;
    const changeCategory = bindActionCreators(ImageActionCreators.setSelectedCategory, dispatch);
    const selectImage = bindActionCreators(ImageActionCreators.selectImage, dispatch);

    const loadContent = () => {
      this.toggleLoading(true);
      ImageActionCreators.syncImages()
        .then(action => this.props.dispatch(action))
        .finally(() => this.toggleLoading(false));
    }

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
                loadContent={loadContent}
                uploadImage={ImageActionCreators.uploadImage}
                deleteImages={ImageActionCreators.deleteImages}
                changeCategory={changeCategory}
                selectedCategory={images.selectedCategory}
                selectImage={selectImage}
                images={images.list}
                toggleLoading={this.toggleLoading} />
            )}/>

            <Route path='/categories' render={ props => (
              <Categories {...props}
                loadContent={loadContent}
                changeCategory={changeCategory}
                images={images.list}
                toggleLoading={this.toggleLoading} />
            )}/>

            <Route path='/compare/:id?' render={ props => (
              <Compare {...props}
                loadContent={loadContent}
                changeCategory={changeCategory}
                downloadOriginalImage={ImageActionCreators.downloadOriginalImage}
                hqImage={images.hqImage}
                dispatch={dispatch}
                images={images.list}
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
