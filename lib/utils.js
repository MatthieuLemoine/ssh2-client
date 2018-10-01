const fs = require('fs');
const inquirer = require('inquirer');

module.exports = {
  askForPassword,
  getOptions
};

function askForPassword() {
  return inquirer
    .prompt([
      {
        type: 'password',
        name: 'password',
        message: 'Input password'
      }
    ])
    .then(answers => answers.password);
}

function getOptions(uri, opts = {}) {
  const envOpts = parseUri(uri);
  const options = {
    ...envOpts,
    ...opts
  };
  // FIXME Not working with dsa keys
  if (options.privateKey && !options.privateKey.indexOf('dsa') > -1) {
    options.privateKey = fs.readFileSync(options.privateKey).toString('utf-8');
  }
  // Use SSH-Agent
  if (!options.agent && process.env.SSH_AUTH_SOCK) {
    options.agent = process.env.SSH_AUTH_SOCK;
  }
  if (options.agent) {
    options.agentForward = true;
  }
  return options;
}

/**
 * Parse : username@host AND host
 */
function parseUri(uri) {
  const opts = {};
  const [username, host] = uri.split('@');
  opts.host = host || username;
  opts.username = host ? username : null;
  return opts;
}
