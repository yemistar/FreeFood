const listEmails = (gmail, pageToken) => {
  return new Promise((resolve, reject) => {
    gmail.users.messages.list({userId: 'me', labelIds: ['IMPORTANT'], pageToken, maxResults: 100}, (err, res) => {
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
