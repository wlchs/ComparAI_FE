import React from 'react';

const Menubar = props => {
  return (
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
  );
};

export default Menubar;
