module.exports = {
  name: 'PingCommand',
  depends: ['Commands'],
  commands: {
    ping: {
      description: 'Pong!',
      category: 'Fun',
      exec() {
        return ':ping_pong: Pong!';
      }
    }
  }
};