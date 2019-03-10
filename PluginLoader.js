const fs = require('fs');
const path = require('path');

let intervals = [];

exports.loadPlugin = file => {
  console.debug(`Loading ${path.basename(file)}...`);
  delete require.cache[require.resolve('./' + file)];
  let plugin = require('./' + file);

  global.plugins[path.basename(file, '.js')] = plugin;

  if (plugin.hasOwnProperty('onEnable'))
    plugin.onEnable();
};

exports.loadPlugins = dirPath => {
  let _setInterval = setInterval;
  global.setInterval = (handler, timeout, arguments) => {
    intervals.push(_setInterval(handler, timeout, arguments));
  };

  fs.readdirSync(dirPath).forEach(file => {
    let filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      exports.loadPlugins(filePath);

      return;
    }

    if (path.extname(file) !== '.js')
      return;

    exports.loadPlugin(filePath);
  });

  global.setInterval = _setInterval;
};

exports.disablePlugins = () => {
  global.client.eventNames().forEach(eventName => {
    global.client.removeAllListeners(eventName);
  });

  intervals.forEach(timeout => {
    clearInterval(timeout);
  });

  Object.keys(global.plugins).forEach(pluginFile => {
    let plugin = global.plugins[pluginFile];
    console.debug(`Unloading ${pluginFile}...`);
    if (plugin.hasOwnProperty('onDisable'))
      plugin.onDisable();
  });

  global.plugins = [];
};