import axios from 'axios';
import __PATH from '../environments';

export const login = (userData, sendNotification) => new Promise((resolve, reject) => {
  if (!userData.email || !userData.password) {
    sendNotification({
      text: 'Töltse ki a hiányzó mezőket!',
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
  if (!userData.email || !userData.password || !userData.code) {
    sendNotification({
      text: 'Töltse ki a hiányzó mezőket!',
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
