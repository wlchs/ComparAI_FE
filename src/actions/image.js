import * as ImageActionTypes from '../actiontypes/image';

export const addImage = image => {
  return {
    type: ImageActionTypes.ADD_IMAGE,
    image
  };
};

export const modifyImage = (image, id) => {
  return {
    type: ImageActionTypes.MODIFY_IMAGE,
    image,
    id
  };
};

export const removeImage = id => {
  return {
    type: ImageActionTypes.REMOVE_IMAGE,
    id
  };
};

export const removeAll = () => {
  return {
    type: ImageActionTypes.REMOVE_ALL
  };
};
