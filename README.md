# ssh2-client

A Promise based wrapper around ssh2 to exec commands or setup a live shell on a remote host.

## Install

    npm i ssh2-client

## Usage

- Execute a command on a remote host : `ssh.exec(HOST, command, options)`
- Open a live shell on a remote host : `ssh.shell(HOST, options)`

`options` is optional. `options.ssh2` is forwarded to [ssh2](https://github.com/mscdex/ssh2).

## Examples

```javascript
const ssh = require('ssh2-client');

const HOST = 'junk@localhost';

// Exec commands on remote host over ssh
ssh
  .exec(HOST, 'touch junk')
  .then(() => ssh.exec(HOST, 'ls -l junk'))
  .then(output => {
    const { out, error } = output;
    console.log(out);
    console.error(error);
  })
  .catch(err => console.error(err));

// Setup a live shell on remote host
ssh
  .shell(HOST)
  .then(() => console.log('Done'))
  .catch(err => console.error(err));

// Enable interactive password prompt
// askPassword option is only needed for the first command
const opts = {
  askPassword: true,
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
```
