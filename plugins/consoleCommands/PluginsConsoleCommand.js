exports.console = {
  commands: {
    plugins: {
      description: 'List plugins and information about them.',
      parameters: ['[plugin]'],
      aliases: ['pl', 'plugin'],
      exec: (label, args) => {
        if (args.length === 0) {
          let plugins = Object.keys(global.plugins);

          return `Plugins (${plugins.length}): ${plugins.join(', ')}`;
        }

        if (args.length === 1) {
          let ids = Object.keys(global.plugins);
          for (let i = ids.length; i--;) {
            if (ids[i].toLowerCase() === args[0].toLowerCase()) {
              let plugin = global.plugins[ids[i]];

              return `[${ids[i]}]
Version: ${plugin.version ? plugin.version : 'Unknown version.'}
Description: ${plugin.description ? plugin.description : 'No description.'}
Commands: ${plugin.commands ? Object.keys(plugin.commands).join(', ') : 'No commands.'}
Console Commands: ${(plugin.console && plugin.console.commands) ? Object.keys(plugin.console.commands).join(', ')
                : 'No console commands.'}`;
            }
          }

          return 'Invalid plugin specified.';
        }
      }
    }
  }
};