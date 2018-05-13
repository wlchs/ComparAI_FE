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
import * as UserActionCreators from './actions/user';
import * as NotificationActionCreators from './actions/notification';

import Login from './views/Login';
import Register from './views/Register';
import Logout from './views/Logout';
import Photos from './views/Photos';
import Categories from './views/Categories';
import Compare from './views/Compare';
import Evaluate from './views/Evaluate';

import NotificationComponent from './components/NotificationComponent';
import NavbarComponent from './components/NavbarComponent';

class App extends Component {
  static propTypes = {
    store: propTypes.object.isRequired
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

  toRegister() {
    this.props.history.push('/register');
  }



  render() {
    const {dispatch, store} = this.props;
    const changeCategory = bindActionCreators(ImageActionCreators.setSelectedCategory, dispatch);
    const selectImage = bindActionCreators(ImageActionCreators.selectImage, dispatch);
    const clearCache = bindActionCreators(ImageActionCreators.clearCache, dispatch);

    const sendNotification = bindActionCreators(NotificationActionCreators.send, dispatch);
    const hideNotification = bindActionCreators(NotificationActionCreators.hide, dispatch);
    const timeNotification = bindActionCreators(NotificationActionCreators.time, dispatch);

    const loadContent = () => {
      this.toggleLoading(true);
      ImageActionCreators.syncImages(this.props.history, sendNotification)
        .then(action => this.props.dispatch(action))
        .finally(() => this.toggleLoading(false));
    }

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Redirect exact from='/' to='/login'/>

            <Route path='/login' render={ props => (
              <div>
                <NavbarComponent disabled />
                <Login {...props}
                  login={userData => UserActionCreators.login(userData, sendNotification)}
                  clearCache={clearCache} />
              </div>
            )}/>

            <Route path='/register' render={ props => (
              <div>
                <NavbarComponent />
                <Register {...props}
                  register={userData => UserActionCreators.register(userData, sendNotification)} />
              </div>
            )}/>

            <Route path='/logout' render={ props => (
              <Logout {...props}
                sendNotification={sendNotification} />
            )}/>

            <Route path='/photos' render={ props => (
              <div>
                <NavbarComponent />
                <Photos {...props}
                  loadContent={loadContent}
                  uploadImage={(img, history) => ImageActionCreators.uploadImage(img, history, sendNotification)}
                  deleteImages={(data, history) => ImageActionCreators.deleteImages(data, history, sendNotification)}
                  changeCategory={changeCategory}
                  selectedCategory={store.images.selectedCategory}
                  selectImage={selectImage}
                  dispatch={dispatch}
                  images={store.images.list}
                  toggleLoading={this.toggleLoading}
                  sendNotification={sendNotification} />
              </div>
            )}/>

            <Route path='/categories' render={ props => (
              <div>
                <NavbarComponent />
                <Categories {...props}
                  loadContent={loadContent}
                  changeCategory={changeCategory}
                  images={store.images.list}
                  toggleLoading={this.toggleLoading} />
              </div>
            )}/>

            <Route path='/compare/:id?' render={ props => (
              <div>
                <NavbarComponent />
                <Compare {...props}
                  loadContent={loadContent}
                  changeCategory={changeCategory}
                  downloadOriginalImage={(id, history) => ImageActionCreators.downloadOriginalImage(id, history, sendNotification)}
                  hqImage={store.images.hqImage}
                  dispatch={dispatch}
                  images={store.images.list}
                  toggleLoading={this.toggleLoading} />
              </div>
            )}/>

            <Route path='/evaluate' render={ props => (
              <div>
                <NavbarComponent />
                <Evaluate {...props}
                  loadContent={loadContent}
                  changeCategory={changeCategory}
                  downloadOriginalImage={(id, history) => ImageActionCreators.downloadOriginalImage(id, history, sendNotification)}
                  hqImage={store.images.hqImage}
                  dispatch={dispatch}
                  images={store.images.list}
                  toggleLoading={this.toggleLoading} />
              </div>
            )}/>

          </Switch>
        </BrowserRouter>
        <NotificationComponent
          text={store.notification.notification.text}
          type={store.notification.notification.type}
          remaining={store.notification.notification.remaining}
          hide={hideNotification}
          time={timeNotification} />
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
  store: state
});


export default connect(mapStateToProps)(App);
