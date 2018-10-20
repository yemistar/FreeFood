const listEmails = (gmail) => {
  return new Promise((resolve, reject) => {
    gmail.users.messages.list({userId: 'me', labelIds: ['IMPORTANT']}, (err, res) => {
      if(err) {
        reject(err);
      } else {
        resolve(res.data);
      }
    });
  });
}

const getEmail = (gmail, id) => {
  return new Promise((resolve, reject) => {
    gmail.users.messages.get({userId: 'me', id, format: 'full'}, (err, res) => {
      if(err) {
        reject(err);
      } else {
        resolve(res.data);
      }
    });
  });
}

module.exports = { listEmails, getEmail }
