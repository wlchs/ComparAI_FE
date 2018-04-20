import * as ImageActionTypes from '../actiontypes/image';

const initialState = {
  selectedCategory: "",
  list: [],
  hqImage: {
    id: undefined,
    src: undefined
  }
};

export default function Image(state=initialState, action) {
  switch (action.type) {

    case ImageActionTypes.SYNC_IMAGES:
    return Object.assign({}, state, {
      list: action.images
    });

    case ImageActionTypes.SELECT_IMAGE:
    const id = state.list.map(image => image.id).indexOf(action.id);
    return Object.assign({}, state, {
      list: [
        ...state.list.slice(0, id),
        {...state.list[id], selected: !state.list[id].selected},
        ...state.list.slice(id + 1),
      ]
    });

    case ImageActionTypes.DOWNLOAD_ORIGINAL_IMAGE:
    return Object.assign({}, state, {
      hqImage: {id: action.id, src: action.hqImage}
    });

    case ImageActionTypes.SET_SELECTED_CATEGORY:
    return Object.assign({}, state, {
      selectedCategory: action.categoryName
    });

    case ImageActionTypes.DELETE_IMAGES:
    return Object.assign({}, state, {
      list: state.list.filter(img => !action.data.id.includes(img.id))
    });

    case ImageActionTypes.CLEAR_CACHE:
    return initialState;

    default:
      return state;
  }
};
