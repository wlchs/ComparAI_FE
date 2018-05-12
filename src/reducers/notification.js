import * as NotificationActionTypes from '../actiontypes/notification';

const initialState = {
  notification: {
    text: undefined,
    type: undefined,
    remaining: 0
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
        remaining: 3000
      }
    };

    case NotificationActionTypes.HIDE:
    return {
      ...state,
      notification: {
        remaining: 0
      }
    };

    case NotificationActionTypes.TIME:
    return {
      ...state,
      notification: {
        ...state.notification,
        remaining: state.notification.remaining - 1000
      }
    };

    default:
    return state;
  }
};
