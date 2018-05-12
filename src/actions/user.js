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
    resolve(response.data.token);
  })
  .catch(err => {
    sendNotification({
      text: 'Hibás felhasználónév vagy jelszó!',
      type: 'error'
    });
    reject(err);
  });
});

export const register = userData => new Promise((resolve, reject) => {
  axios.post(`${__PATH}/register`, {
    userId: userData.email,
    password: userData.password,
    code: userData.code
  })
  .then(response => {
    console.log(response);
    resolve();
  })
  .catch(err => {
    reject(err);
  });
});
