const Client = require('ssh2').Client;
const utils  = require('./utils');

module.exports = getClient;

function getClient(uri, opts) {
  const clientOpts = utils.getOptions(uri, opts);
  return new Promise((resolve, reject) => {
    const client = new Client();
    client.on('ready', () => {
      resolve(client);
    })
    // FIXME keyboard-interactive never triggered
    .on('keyboard-interactive', utils.onKeyboardInteractive)
    .on('error', reject);
    return client
      .connect(clientOpts);
  });
}
