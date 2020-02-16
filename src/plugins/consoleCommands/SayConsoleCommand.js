const {client} = require('../../shard');

module.exports = {
  name: 'SayConsoleCommand',
  depends: ['Console'],
  console: {
    commands: {
      say: {
        description: 'Say something!',
        parameters: ['<channel id> <message>'],
        exec(label, args) {
          if (args.length < 2) {
            return 'Usage: say <channel id> <message>';
          }

          let channel = client.channels.get(args[0]);
          if (typeof channel === 'undefined') {
            return 'Unknown channel.';
          }

          args.shift();
          let msg = args.join(' ');

          channel.send(msg);
        }
      }
    }
  }
};