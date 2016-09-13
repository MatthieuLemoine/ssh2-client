const ssh = require('../index');

const HOST = 'junk@localhost';

// Enable interactive password prompt
// Will be store in memory for following connections
const opts = {
  askPassword : true
};

ssh
  .shell(HOST, opts)
  .then(() => console.log('Done'))
  .catch(err => console.error(err));
