const ssh = require('../index');

const HOST = 'junk@localhost';

// Enable interactive password prompt
// Will be store in memory for following connections
const opts = {
  askPassword: true
};

ssh
  .exec(HOST, 'touch junk', opts)
  .then(() => ssh.exec(HOST, 'ls -l junk'))
  .then(output => {
    const { out, error } = output;
    console.log(out);
    console.error(error);
  })
  .catch(err => console.error(err));
