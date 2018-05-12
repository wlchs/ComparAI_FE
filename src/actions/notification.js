import * as NotificationActionTypes from '../actiontypes/notification';

export const send = notificationProps => {
  return {
    type: NotificationActionTypes.SEND,
    notificationProps
  };
};

export const hide = () => {
  return {
    type: NotificationActionTypes.HIDE,
  };
};

export const time = () => {
  return {
    type: NotificationActionTypes.TIME
  };
};
