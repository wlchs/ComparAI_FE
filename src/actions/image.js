import * as ImageActionTypes from '../actiontypes/image';
import axios from 'axios';
import __PATH from '../environments';

export const syncImages = () => new Promise((resolve, reject) => {
  let images = [];

  axios.get(`${__PATH}/getImagesByCategory/`, {
    headers: {'Authorization': `Bearer: ${sessionStorage.getItem('access_token')}`}
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
      console.log(err);
    })
    .finally(() => {
      resolve({
        type: ImageActionTypes.SYNC_IMAGES,
        images
      });
    });
});

export const downloadOriginalImage = id => new Promise((resolve, reject) => {
  axios.get(`${__PATH}/getImageById/${id}`, {
    headers: {'Authorization': `Bearer: ${sessionStorage.getItem('access_token')}`}
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
      reject(err);
    });
});

export const setSelectedCategory = categoryName => {
  return {
    type: ImageActionTypes.SET_SELECTED_CATEGORY,
    categoryName
  };
};
