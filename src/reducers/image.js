import * as ImageActionTypes from '../actiontypes/image';

const initialState = [];

export default function Image(state=initialState, action) {
  switch (action.type) {

    case ImageActionTypes.ADD_IMAGE:
      return [
        ...state,
        action.image
      ];

    case ImageActionTypes.MODIFY_IMAGE:
      return [
        ...state.slice(0, action.id),
        action.image,
        ...state.slice(action.id + 1),
      ];

    case ImageActionTypes.REMOVE_IMAGE:
      return [
        ...state.slice(0, action.id),
        ...state.slice(action.id + 1),
      ];

    default:
      return state;
  }
};
