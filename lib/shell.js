const getClient = require('./client');

module.exports = shell;

function shell(uri, opts) {
  return getClient(uri, opts)
    .then(setupShell);
}

function setupShell(client) {
  return new Promise((resolve, reject) =>
    client.shell((err, stream) => {
      if (err) {
        reject(err);
      } else {
        // Piping
        process.stdin.setRawMode(true);
        process.stdin.pipe(stream);
        stream.pipe(process.stdout);
        stream.stderr.pipe(process.stderr);
        stream.setWindow(process.stdout.rows, process.stdout.columns);
        process.stdout.on('resize', () => {
          stream.setWindow(process.stdout.rows, process.stdout.columns);
        });

        // Retrieve keypress listeners
        const listeners = process.stdin.listeners('keypress');
        // Remove those listeners
        process.stdin.removeAllListeners('keypress');

        stream.on('close', () => {
          // Release stdin
          process.stdin.setRawMode(false);
          process.stdin.unpipe(stream);
          process.stdin.unref();
          // Restore listeners
          listeners.forEach(listener => process.stdin.addListener('keypress', listener));
          // End connection
          client.end();
          resolve();
        });
      }
    })
  );
}
