import * as ImageActionTypes from '../actiontypes/image';
import axios from 'axios';
import __PATH from '../environments';

const redirect = history => {
  sessionStorage.removeItem('access_token');
  history.push('/');
}

const formatResultImages = images => {
  return images.map(image => {
    const data = new Buffer(image.thumbnail, 'binary').toString('base64');
    return {
      ...image,
      selected: false,
      data: `data:${image.contentType};base64,${data}`
    };
  });
};

export const syncImages = (history, sendNotification) => new Promise((resolve, reject) => {
  axios.get(`${__PATH}/getImagesByCategory/`, {
    headers: {'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`}
  })
    .then(response => formatResultImages(response.data.images))
    .then(images => {
      sendNotification({
        text: 'Szinkronizálás sikeres!',
        type: 'info'
      });
      return resolve({
        type: ImageActionTypes.SYNC_IMAGES,
        images
      });
    })
    .catch(err => {
      sendNotification({
        text: 'Szinkronizálás sikertelen!',
        type: 'error'
      });
      if (err && err.response && err.response.status === 401) {
        return redirect(history);
      }
      return reject(err);
    })
});

export const uploadImage = (imageFile, history, sendNotification) => new Promise((resolve, reject) => {
  let data = new FormData();
  for (let i = 0; i < imageFile.length; ++i) {
    data.append('image', imageFile[i]);
  }

  axios.post(`${__PATH}/upload/`, data, {
    headers: {'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`}
  })
    .then(response => formatResultImages(response.data.images))
    .then(images => {
      sendNotification({
        text: 'Képek sikeresen feltöltve!',
        type: 'success'
      });
      return resolve({
        type: ImageActionTypes.UPLOAD_IMAGE,
        images
      });
    })
    .catch(err => {
      sendNotification({
        text: err,
        type: 'error'
      });
      if (err && err.response && err.response.status === 401) {
        redirect(history);
      }
      return reject(err);
    });
});

export const updateImage = (data, history) => new Promise((resolve, reject) => {
  axios.put(`${__PATH}/update/${data.id}`, {
  	serviceProvider: data.serviceProvider,
  	categoryName: data.categoryName,
  	decision: data.decision
  }, {
    headers: {'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`}
  })
    .then(response =>
      resolve({
        type: ImageActionTypes.UPDATE_IMAGE,
        decision: data.decision,
        id: data.id
      }))
    .catch(err => {
      if (err && err.response && err.response.status === 401) {
        redirect(history);
      }
      return reject(err);
    });
});

export const deleteImages = (data, history, sendNotification) => new Promise((resolve, reject) => {
  axios.delete(`${__PATH}/deleteMultipleImages/`, {
    headers: {'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
    data
  })
    .then(response => {
      sendNotification({
        text: 'Kép(ek) sikeresen törölve!',
        type: 'success'
      });
      return resolve({
        type: ImageActionTypes.DELETE_IMAGES,
        data
      });
    })
    .catch(err => {
      sendNotification({
        text: 'Hiba a kép(ek) törlése közben!',
        type: 'error'
      });
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

export const downloadOriginalImage = (id, history, sendNotification) => new Promise((resolve, reject) => {
  axios.get(`${__PATH}/getImageById/${id}`, {
    headers: {'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`}
  })
    .then(response => {
      sendNotification({
        text: 'Eredeti kép letöltve!',
        type: 'info'
      });
      const data = new Buffer(response.data.data, 'binary').toString('base64');
      const hqImage = `data:${response.data.contentType};base64,${data}`;
      return resolve({
        type: ImageActionTypes.DOWNLOAD_ORIGINAL_IMAGE,
        id,
        hqImage
      });
    })
    .catch(err => {
      sendNotification({
        text: 'Eredeti kép letöltése sikertelen!',
        type: 'error'
      });
      if (err && err.response && err.response.status === 401) {
        redirect(history);
      }
      return reject(err);
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
