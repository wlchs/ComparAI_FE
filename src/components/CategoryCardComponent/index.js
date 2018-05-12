import React from 'react';
import './styles.css';

const CategoryCardComponent = props => {
  return (
    <div className="card">
      <div className="image mozaik_container" onClick={() => {props.onClick(props.name)}}>
        {props.images[0] ? <img className="mozaik" src={props.images[0]} alt="0" /> : null}
        {props.images[1] ? <img className="mozaik" src={props.images[1]} alt="1" /> : null}
        {props.images[2] ? <img className="mozaik" src={props.images[2]} alt="2" /> : null}
        {props.images[3] ? <img className="mozaik" src={props.images[3]} alt="3" /> : null}
      </div>
      <div className="footer">
        <div className="info">
          <div className="title">
            {props.name}
          </div>
          <div className="date">
            {props.images.length} kép
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCardComponent;
