exports.console = {
  commands: {
    reload: {
      description: 'Attempts to reloads plugins, doesn\'t really work.',
      aliases: ['rl'],
      exec: (label, args) => {
        global.PluginLoader.disablePlugins();
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