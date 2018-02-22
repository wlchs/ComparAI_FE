import React, { Component } from 'react';

export default class Photos extends Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <div className="link_group">
            <div className="nav_element">
              Fényképeim
            </div>
            <div className="clickable nav_element">
              Kategóriák
            </div>
            <div className="clickable nav_element">
              Összehasonlítás
            </div>
          </div>
          <div className="link_group">
            <div className="clickable nav_element logout">
              Kijelentkezés
            </div>
          </div>
        </div>
        <div className="menu_bar">
          <div className="filter small button">
            <div className="center">
              Összes kép
            </div>
            <div className="filter dropdown"></div>
          </div>
          <div className="small button success text">
            Új kép hozzáadása
          </div>
          <div className="small button error text">
            Kijelöltek törlése
          </div>
        </div>
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
