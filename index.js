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

console.debug('Connecting to Discord...');
client.login(options.token);