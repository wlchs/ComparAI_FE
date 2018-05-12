import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = props => {
  return (
    <div className="navbar">
      <div className="link_group">
        <NavLink exact to="/" className="nav_element">
          ComparAI
        </NavLink>
      </div>
      {props.disabled ? null :
        <div className="link_group">
          <NavLink to="/photos" className="nav_element">
            Fényképeim
          </NavLink>
          <NavLink to="/categories" className="nav_element">
            Kategóriák
          </NavLink>
          <NavLink to="/compare" className="nav_element">
            Összehasonlítás
          </NavLink>
          <NavLink to="/evaluate" className="nav_element">
            Értékelés (Béta)
          </NavLink>
        </div>
      }
      {props.disabled ? null :
        <div className="link_group">
          <NavLink to="/logout" className="nav_element logout">
            Kijelentkezés
          </NavLink>
        </div>
      }
    </div>
  );
};

export default Navbar;
