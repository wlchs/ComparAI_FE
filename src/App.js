import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ImageActionCreators from './actions/image';

import Login from './views/Login';
import Logout from './views/Logout';
import Photos from './views/Photos';

class App extends Component {

  static propTypes = {
    images: propTypes.array.isRequired
  };

  render() {

    const {dispatch, images} = this.props;
    const addImage = bindActionCreators(ImageActionCreators.addImage, dispatch);
    const modifyImage = bindActionCreators(ImageActionCreators.modifyImage, dispatch);
    const removeImage = bindActionCreators(ImageActionCreators.removeImage, dispatch);

    return (
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
                selectedCategory=""
                images={this.props.images}
                addImage={addImage}
                modifyImage={modifyImage}
                removeImage={removeImage} />
            )}/>

          </Switch>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  images: state
});


export default connect(mapStateToProps)(App);
