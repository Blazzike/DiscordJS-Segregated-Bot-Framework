const options = require('./options');
const { ShardingManager } = require('discord.js');

if (!options.token) {
  console.error('No token set, please edit config.js or provide the TOKEN enviroment variable.');
  process.exit(1);
}

const manager = new ShardingManager('./shard.js', {
  token: options.token,
  totalShards: options.shards
});

manager.spawn();
manager.on('launch', shard => {
  shard.on('death', process => {
    console.error(`Shard ${shard.id} died. It'll be restarted.`);
  });

  console.log(`Shard ${shard.id} spawned.`);
});