import axios from 'axios';
import __PATH from '../environments';

export const login = (userData, sendNotification) => new Promise((resolve, reject) => {
  axios.post(`${__PATH}/auth`, {
    userId: userData.email,
    password: userData.password
  })
  .then(response => {
    sessionStorage.setItem('access_token', response.data.token);
    sendNotification({
      text: 'Sikeres bejelentkezés!',
      type: 'success'
    });
    return resolve(response.data.token);
  })
  .catch(err => {
    sendNotification({
      text: err.response ? err.response.data : err.message,
      type: 'error'
    });
    return reject(err);
  });
});

export const register = (userData, sendNotification) => new Promise((resolve, reject) => {
  axios.post(`${__PATH}/register`, {
    userId: userData.email,
    password: userData.password,
    code: userData.code
  })
  .then(response => {
    sendNotification({
      text: 'Sikeres regisztráció!',
      type: 'success'
    });
    return resolve();
  })
  .catch(err => {
    sendNotification({
      text: err.response.data,
      type: 'error'
    });
    return reject(err);
  });
});
