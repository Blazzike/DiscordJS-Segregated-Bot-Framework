options = require('./options');
discord = require('discord.js');
PluginLoader = require('./PluginLoader');

client = new discord.Client();
plugins = {};

client.once('ready', () => {
  console.debug('Loading plugins...');
  PluginLoader.loadPlugins('./plugins/');
  console.debug('Loaded plugins!');

  console.debug('===', client.user.tag, '===');
  console.debug('Plugins:', Object.keys(plugins).length);

  Object.values(plugins).forEach(plugin => {
    if (plugin.hasOwnProperty('onReady'))
      plugin.onReady();
  });
});

client.on('error', console.error);

process.stdin.resume();
process.on('SIGINT', (e) => {
  PluginLoader.disablePlugins();

  process.exit();
});

if (!options.token) {
  console.error("No token set, please edit config.js or provide the TOKEN enviroment variable.");
  process.exit(1);
}

console.debug('Connecting to Discord...');
client.login(options.token);