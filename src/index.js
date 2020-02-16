const config = require('./config');
const {ShardingManager} = require('discord.js');

if (!config.token) {
  console.error('No token defined, please edit config.js or define the TOKEN environment variable.');

  process.exit(0);
}

const manager = new ShardingManager('./src/shard.js', {
  token: config.token,
  totalShards: config.shards
});

manager.spawn();
manager.on('launch', (shard) => {
  shard.on('death', () => {
    console.error(`Shard ${shard.id} died. It'll be restarted.`);
  });

  console.log(`Shard ${shard.id} spawned.`);
});