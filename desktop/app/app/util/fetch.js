import axios from 'axios';

export const wallet = (token) => {
  return new Promise((resolve, reject) => {
    axios.post('/get/wallet', {token}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.wallet);
      } else if(res.data.message) {
        reject(res.data.message);
      } else {
        reject('Error occured while fetching wallet');
      }
    });
  });
}

export const pending = (token) => {
  return new Promise((resolve, reject) => {
    axios.post('/get/pending', {token}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.pending);
      } else if(res.data.message) {
        reject(res.data.message);
      } else {
        reject('Error occured while fetching pending');
      }
    });
  });
}

export const notifications = (token) => {
  return new Promise((resolve, reject) => {
    axios.post('/get/notifications', {token}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.notifications);
      } else if(res.data.message) {
        reject(res.data.message);
      } else {
        reject('Error occured while fetching notifications');
      }
    });
  });
}

export const friends = (token) => {
  return new Promise((resolve, reject) => {
    axios.post('/get/friends', {token}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.friends);
      } else if(res.data.message) {
        reject(res.data.message);
      } else {
        reject('Error occured while fetching friends');
      }
    });
  });
}

export const services = (token, email) => {
  return new Promise((resolve, reject) => {
    axios.post('/get/services', {token, email}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.services);
      } else if(res.data.message) {
        reject(res.data.message);
      } else {
        reject('Error occured while fetching services');
      }
    });
  });
}

export const tasks = (token, email) => {
  return new Promise((resolve, reject) => {
    axios.post('/get/tasks', {token, email}).then((res) => {
      if(res.data.status === 200) {
        resolve(res.data.tasks);
      } else if(res.data.message) {
        reject(res.data.message);
      } else {
        reject('Error occured while fetching tasks');
      }
    });
  });
}

export default Fetch = {
  pending,
  notifications,
  services,
  tasks,
  friends,
  wallet
}
