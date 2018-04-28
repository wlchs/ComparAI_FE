import * as ImageActionTypes from '../actiontypes/image';
import axios from 'axios';
import __PATH from '../environments';

const redirect = history => {
  sessionStorage.removeItem('access_token');
  history.push('/');
}

export const syncImages = history => new Promise((resolve, reject) => {
  let images = [];

  axios.get(`${__PATH}/getImagesByCategory/`, {
    headers: {'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`}
  })
    .then(response => {
      console.log(response);

      images = response.data.images.map(image => {
        const data = new Buffer(image.thumbnail, 'binary').toString('base64');
        return {
          ...image,
          selected: false,
          data: `data:${image.contentType};base64,${data}`
        };
      });
    })
    .catch(err => {
      if (err && err.response && err.response.status === 401) {
        redirect(history);
      }
    })
    .finally(() => {
      resolve({
        type: ImageActionTypes.SYNC_IMAGES,
        images
      });
    });
});

export const uploadImage = (imageFile, history) => new Promise((resolve, reject) => {
  let data = new FormData();
  for (let i = 0; i < imageFile.length; ++i) {
    data.append('image', imageFile[i]);
  }

  axios.post(`${__PATH}/uploadSingle/`, data, {
    headers: {'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`}
  })
    .then(response => {
      console.log(response);
      resolve({
        type: ImageActionTypes.UPLOAD_IMAGE,
      });
    })
    .catch(err => {
      console.log(err);
      if (err && err.response && err.response.status === 401) {
        redirect(history);
      }
      reject();
    });
});

export const deleteImages = (data, history) => new Promise((resolve, reject) => {
  axios.delete(`${__PATH}/deleteMultipleImages/`, {
    headers: {'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
    data
  })
    .then(response => {
      console.log(response);
      resolve({
        type: ImageActionTypes.DELETE_IMAGES,
        data
      });
    })
    .catch(err => {
      console.log(err);
      if (err && err.response && err.response.status === 401) {
        redirect(history);
      }
      reject({
        type: ImageActionTypes.DELETE_IMAGES,
        data: []
      });
    });
});

export const selectImage = id => {
  return {
    type: ImageActionTypes.SELECT_IMAGE,
    id
  };
};

export const downloadOriginalImage = (id, history) => new Promise((resolve, reject) => {
  axios.get(`${__PATH}/getImageById/${id}`, {
    headers: {'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`}
  })
    .then(response => {
      console.log(response);
      const data = new Buffer(response.data.data, 'binary').toString('base64');
      const hqImage = `data:${response.data.contentType};base64,${data}`;
      resolve({
        type: ImageActionTypes.DOWNLOAD_ORIGINAL_IMAGE,
        id,
        hqImage
      });
    })
    .catch(err => {
      if (err && err.response && err.response.status === 401) {
        redirect(history);
      }
      reject(err);
    });
});

export const setSelectedCategory = categoryName => {
  return {
    type: ImageActionTypes.SET_SELECTED_CATEGORY,
    categoryName
  };
};

export const clearCache = () => {
  return {
    type: ImageActionTypes.CLEAR_CACHE
  };
};
