exports.commands = {
  ping: {
    description: 'Pong!',
    category: 'Fun',
    exec: (label, args, msg) => {
      return ':ping_pong: Pong!';
    }
  }
};