import * as UserActionTypes from '../actiontypes/user';

const initialState = {
  email: undefined,
  password: undefined,
  access_token: undefined
};

export default function User(state=initialState, action) {
  switch (action.type) {

    case UserActionTypes.SET_TOKEN:
      return Object.assign({}, state, {
        access_token: action.access_token
      });
      
    case UserActionTypes.RESET_TOKEN:
      return Object.assign({}, state, {
        access_token: undefined
      });

    default:
      return state;
  }
};
