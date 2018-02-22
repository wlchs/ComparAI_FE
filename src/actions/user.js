import * as UserActionTypes from '../actiontypes/user';

export const setToken = access_token => {
  return {
    type: UserActionTypes.SET_TOKEN,
    access_token
  };
};

export const resetToken = () => {
  return {
    type: UserActionTypes.RESET_TOKEN
  };
};
