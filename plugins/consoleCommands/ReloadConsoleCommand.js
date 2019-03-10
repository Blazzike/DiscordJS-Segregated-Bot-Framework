exports.console = {
  commands: {
    reload: {
      description: 'Reloads plugins, not for production use!',
      aliases: ['rl'],
      exec: (label, args) => {
        global.PluginLoader.disablePlugins();
        console.log(global.plugins);
        global.PluginLoader.loadPlugins('./plugins/');

        Object.values(global.plugins).forEach(plugin => {
          if (plugin.hasOwnProperty('onReady'))
            plugin.onReady();
        });

        return 'Reloaded.';
      }
    }
  }
};