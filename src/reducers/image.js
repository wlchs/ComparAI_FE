import * as ImageActionTypes from '../actiontypes/image';

const initialState = {
  selectedCategory: "",
  list: []
};

export default function Image(state=initialState, action) {
  switch (action.type) {

    case ImageActionTypes.ADD_IMAGE:
    return Object.assign({}, state, {
      list: [
        ...state.list,
        action.image
      ]
    })

    case ImageActionTypes.MODIFY_IMAGE:
      return Object.assign({}, state, {
        list: [
          ...state.slice(0, action.id),
          action.image,
          ...state.slice(action.id + 1),
        ]
      })

    case ImageActionTypes.REMOVE_IMAGE:
      return Object.assign({}, state, {
        list: [
          ...state.slice(0, action.id),
          ...state.slice(action.id + 1),
        ]
      })

    case ImageActionTypes.REMOVE_ALL:
    return Object.assign({}, state, {
      list: []
    })

    case ImageActionTypes.SET_SELECTED_CATEGORY:
    return Object.assign({}, state, {
      selectedCategory: action.categoryName,
      list: [...state.list]
    })

    default:
      return state;
  }
};
