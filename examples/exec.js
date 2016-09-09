const ssh = require('../index');

ssh
  .exec('malem@localhost', 'touch junk')
  .then(() => ssh.exec('malem@localhost', 'ls -l junk'))
  .then((output) => {
    const { out, error } = output;
    console.log(out);
    console.error(error);
  })
  .catch(err => console.error(err));
