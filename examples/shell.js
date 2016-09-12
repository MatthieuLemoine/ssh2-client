const ssh = require('../index');

const HOST = 'junk@localhost';

ssh
  .shell(HOST)
  .then(() => console.log('Done'))
  .catch(err => console.error(err));
