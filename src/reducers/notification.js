import * as NotificationActionTypes from '../actiontypes/notification';

const initialState = {
  notification: {
    text: undefined,
    type: undefined,
    enabled: false
  }
};

export default function Image(state=Object.assign(initialState, {}), action) {
  switch (action.type) {

    case NotificationActionTypes.SEND:
    return {
      ...state,
      notification: {
        text: action.notificationProps.text,
        type: action.notificationProps.type,
        enabled: true
      }
    };

    case NotificationActionTypes.HIDE:
    return {
      ...state,
      notification: {
        enabled: false
      }
    };

    default:
      return initialState;
  }
};
