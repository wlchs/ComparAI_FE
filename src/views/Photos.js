import React, { Component } from 'react';
import axios from 'axios';
import __PATH from '../environments';

import Navbar from '../components/Navbar';
import Menubar from '../components/Menubar';

export default class Photos extends Component {

  constructor(props) {
    super(props);

    const img = <img src='http://via.placeholder.com/350x150' />;

    this.state = {
      img: img
    };

    this.access_token = sessionStorage.getItem('access_token');
  }

  componentDidMount() {
    if (!sessionStorage.getItem('access_token')) {
      this.props.history.push('/');
    }

    this.categoryListRequest = axios.get(`${__PATH}/getImageById/5a8f03dc1abdda551aa19b0f`,{
      headers: {'Authorization': `Bearer: ${this.access_token}`},
      responseType: 'arraybuffer'
    })
      .then(response => new Buffer(response.data, 'binary').toString('base64'))
      .then(encoded => this.setState({
        img: <img src={"data:image/jpeg;base64," + encoded} />
      }))
      .catch(err => {
        console.log(err);
      });

  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <Navbar />
        <Menubar />
        {this.state.img}
        <div className="images">
          <div className="card">
            <img className="image" src="http://via.placeholder.com/500x500?text=Image" />
            <div className="footer">
              <div className="checkbox">
                X
              </div>
              <div className="info">
                <div className="title">
                  Lorem ipsum
                </div>
                <div className="date">
                  2018.02.17
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <img className="image" src="http://via.placeholder.com/500x500?text=Image" />
            <div className="footer">
              <div className="checkbox">
                X
              </div>
              <div className="info">
                <div className="title">
                  Lorem ipsum
                </div>
                <div className="date">
                  2018.02.17
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <img className="image" src="http://via.placeholder.com/500x500?text=Image" />
            <div className="footer">
              <div className="checkbox">

              </div>
              <div className="info">
                <div className="title">
                  Lorem ipsum
                </div>
                <div className="date">
                  2018.02.17
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <img className="image" src="http://via.placeholder.com/500x500?text=Image" />
            <div className="footer">
              <div className="checkbox">

              </div>
              <div className="info">
                <div className="title">
                  Lorem ipsum
                </div>
                <div className="date">
                  2018.02.17
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <img className="image" src="http://via.placeholder.com/500x500?text=Image" />
            <div className="footer">
              <div className="checkbox">

              </div>
              <div className="info">
                <div className="title">
                  Lorem ipsum
                </div>
                <div className="date">
                  2018.02.17
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <img className="image" src="http://via.placeholder.com/500x500?text=Image" />
            <div className="footer">
              <div className="checkbox">

              </div>
              <div className="info">
                <div className="title">
                  Lorem ipsum
                </div>
                <div className="date">
                  2018.02.17
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
