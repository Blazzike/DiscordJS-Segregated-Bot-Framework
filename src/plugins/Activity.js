const {client} = require('../shard');

module.exports = {
  name: 'Activity',
  enable() {
    client.user.setActivity('Demo', {
      type: 'PLAYING'
    });
  }
};