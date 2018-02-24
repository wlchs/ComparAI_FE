import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

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

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }

    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggleLoading(loading) {
    this.setState(state => {
      return state.loading !== loading ? { loading } : null;
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
                images={images}
                addImage={addImage}
                modifyImage={modifyImage}
                removeImage={removeImage}
                removeAll={removeAll}
                toggleLoading={this.toggleLoading} />
            )}/>

          </Switch>
        </BrowserRouter>
        <div className="loadingSpinner">
          <BounceLoader
            color={'#4D4D4D'}
            loading={this.state.loading}
            size={200}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  images: state
});


export default connect(mapStateToProps)(App);
