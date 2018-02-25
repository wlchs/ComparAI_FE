import React, { Component } from 'react';
import axios from 'axios';
import __PATH from '../environments';

import Navbar from '../components/Navbar';

export default class Compare extends Component {


  render() {

    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="nav_arrow left">&lt;</div>
          <img className="big_image" src="http://via.placeholder.com/500x500?text=Image" />
          <div className="info">
            <div className="info_row">Név: <b>Lorem ipsum</b></div>
            <div className="info_row">Dátum: 2018.02.17</div>
            <ul>
              <b>asdasdasdasd 1 kategóriák:</b>
              <li>- Kategória</li>
              <li>- Kategória</li>
              <li>- Kategória</li>
            </ul>
            <ul>
              <b>asdasdasdasd 2 kategóriák:</b>
              <li>- Isabella</li>
              <li>- Isabella</li>
              <li>- Kategória</li>
            </ul>
            <ul>
              <b>asdasdasdasd 3 kategóriák:</b>
              <li>- Kategória</li>
              <li>- Kategória</li>
              <li>- Kategória</li>
            </ul>
          </div>
          <div className="nav_arrow right">&gt;</div>
        </div>
      </div>
    );
  }
}
