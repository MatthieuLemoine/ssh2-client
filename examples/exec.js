const ssh = require('../index');

const HOST = 'junk@localhost';

ssh
  .exec(HOST, 'touch junk')
  .then(() => ssh.exec(HOST, 'ls -l junk'))
  .then((output) => {
    const { out, error } = output;
    console.log(out);
    console.error(error);
  })
  .catch(err => console.error(err));
