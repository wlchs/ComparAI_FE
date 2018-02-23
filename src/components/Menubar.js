import React from 'react';

import Dropdown from './Dropdown';

const Menubar = props => {
  return (
    <div className="menu_bar">
      <Dropdown
        selectedCategory={props.selectedCategory}
        categories={props.categories}
        changeCategory={props.changeCategory} />
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
