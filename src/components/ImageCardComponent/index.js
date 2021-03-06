import React from 'react';
import './styles.css';

const ImageCardComponent = props => {
  return (
    <div className="card">
      <img className="image"
        src={props.img}
        alt={props.name}
        onClick={props.navigate} />
      <div className="footer">
        <div className="checkbox" onClick={() => props.selectImage(props.id)}>
          {props.selected ? 'X' : ''}
        </div>
        <div className="info">
          <div className="title">
            {props.name}
          </div>
          <div className="date">
            {props.date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCardComponent;
