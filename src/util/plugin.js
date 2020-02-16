const config = require('../config');
const fs = require('fs');
const {log, LogType} = require('../util');

module.exports = {
  pluginsDirectory: '../plugins',
  plugins: {},
  loadPlugins() {
    const plugins = {};

    for (const pluginFileName of config.plugins) {
      const plugin = this.loadPlugin(pluginFileName);
      if (plugin) {
        plugins[plugin.name] = plugin;
      }
    }

    Object.values(plugins).forEach((plugin) => {
      log(LogType.INFO, `Enabling plugin ${plugin.name}...`);

      if (plugin.hasOwnProperty('depends')) {
        for (const dependency of plugin.depends) {
          if (!Object.keys(plugins).includes(dependency)) {
            log(LogType.ERROR, `Failed to enable plugin "${plugin.name}": Dependency "${dependency}" not found.`);

            return;
          }
        }
      }

      if (plugin.hasOwnProperty('enable')) {
        plugin.enable();
      }

      this.plugins[plugin.name] = plugin;
    });
  },
  loadPlugin(pluginFileName) {
    log(LogType.INFO, `Loading plugin: ${pluginFileName}...`);

    let pluginPath = `${__dirname}/${this.pluginsDirectory}/${pluginFileName}`;
    if (fs.existsSync(pluginPath + '.js')) {
      pluginPath += '.js';
    } else {
      pluginPath += '/index.js'
    }

    if (!fs.existsSync(`${pluginPath}`)) {
      log(LogType.ERROR, `Invalid plugin "${pluginFileName}": Plugin file does not exist.`);

      return;
    }

    const plugin = require(pluginPath);

    if (!plugin.hasOwnProperty('name')) {
      log(LogType.ERROR, `Invalid plugin "${pluginFileName}": No exported name property.`);

      return;
    }

    if (this.plugins.hasOwnProperty(plugin.name)) {
      log(LogType.ERROR, `Failed to load plugin "${pluginFileName}": Plugin with same name already loaded.`);

      return;
    }

    return plugin;
  },
  unloadPlugins() {
    for (const [pluginName, plugin] of Object.entries(this.plugins)) {
      log(LogType.INFO, `Disabling plugin: ${pluginName}...`);

      this.disablePlugin(plugin);
    }

    this.plugins = {};
  },
  disablePlugin(plugin) {
    if (plugin.hasOwnProperty('disable')) {
      plugin.disable();
    }
  },
  clientEventHandler(eventName, ...args) {
    for (const plugin of Object.values(this.plugins)) {
      if (plugin.hasOwnProperty(eventName)) {
        plugin[eventName](...args);
      }
    }
  }
};