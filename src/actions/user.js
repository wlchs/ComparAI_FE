import * as UserActionTypes from '../actiontypes/user';
import axios from 'axios';
import __PATH from '../environments';

export const login = userData => new Promise((resolve, reject) => {
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
    reject(err);
  });
});
