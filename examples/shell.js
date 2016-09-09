const ssh = require('../index');

ssh
  .shell('malem@localhost')
  .then(() => console.log('Done'))
  .catch(err => console.error(err));
