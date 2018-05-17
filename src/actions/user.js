import axios from 'axios';
import __PATH from '../environments';

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const login = (userData, sendNotification) => new Promise((resolve, reject) => {
  if (!emailRegex.test(userData.email) || !userData.password) {
    sendNotification({
      text: 'A megadott adatok formátuma nem megfelelő!',
      type: 'error'
    });
    return reject(userData);
  }
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
      text: 'Hibás felhasználónév vagy jelszó!',
      type: 'error'
    });
    return reject(err);
  });
});

export const register = (userData, sendNotification) => new Promise((resolve, reject) => {
  if (!emailRegex.test(userData.email) || !userData.password || !userData.code) {
    sendNotification({
      text: 'A megadott adatok formátuma nem megfelelő!',
      type: 'error'
    });
    return reject(userData);
  }
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
