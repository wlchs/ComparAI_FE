import axios from 'axios';
import __PATH from '../environments';

export const login = (userData, sendNotification) => new Promise((resolve, reject) => {
  axios.post(`${__PATH}/auth`, {
    userId: userData.email,
    password: userData.password
  })
  .then(response => {
    console.log(response);
    sessionStorage.setItem('access_token', response.data.token);
    sendNotification({
      text: 'Sikeres bejelentkezés!',
      type: 'success'
    });
    resolve(response.data.token);
  })
  .catch(err => {
    sendNotification({
      text: err.message,
      type: 'error'
    });
    reject(err);
  });
});

export const register = (userData, sendNotification) => new Promise((resolve, reject) => {
  axios.post(`${__PATH}/register`, {
    userId: userData.email,
    password: userData.password,
    code: userData.code
  })
  .then(response => {
    console.log(response);
    sendNotification({
      text: 'Sikeres regisztráció!',
      type: 'success'
    });
    resolve();
  })
  .catch(err => {
    sendNotification({
      text: 'Sikertelen regisztráció!',
      type: 'error'
    });
    reject(err);
  });
});
