const fs = require('fs');

module.exports = {
  getOptions,
  onKeyboardInteractive
};

function getOptions(uri, opts = {}) {
  const envOpts    = parseUri(uri);
  opts.username    = opts.username || envOpts.username;
  opts.host        = opts.host || envOpts.host;
  opts.tryKeyboard = true;
  // FIXME Not working with dsa keys
  if (opts.privateKey && !opts.private_key.indexOf('dsa') > -1) {
    opts.privateKey = fs.readFileSync(opts.private_key).toString('utf-8');
  }
  // Use SSH-Agent
  if (!opts.agent && process.env.SSH_AUTH_SOCK) {
    opts.agent = process.env.SSH_AUTH_SOCK;
  }
  if (opts.agent) {
    opts.agentForward = true;
  }
  return opts;
}

function onKeyboardInteractive(name, instructions, instructionsLang, prompts, finish) {
  // TODO prompt password
  console.log('Interactive');
  finish('junk');
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
