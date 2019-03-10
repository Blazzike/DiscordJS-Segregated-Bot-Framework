const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');

let intervals = [];

exports.loadPlugin = file => {
  console.debug(`Loading ${path.basename(file)}...`);
  let plugin = require('./' + file);

  global.plugins[path.basename(file, '.js')] = plugin;

  if (plugin.hasOwnProperty('onEnable'))
    plugin.onEnable();
};

function queryPluginDirectory(dirPath, pluginFileCallback, ignore = []) {
  let ignoreJSONPath = path.join(dirPath, "ignore.json");
  if (fs.existsSync(ignoreJSONPath)) {
    try {
      ignore = [...ignore, ...fg.sync(JSON.parse(fs.readFileSync(ignoreJSONPath, 'utf8')), {
        cwd: dirPath
      }).map(relativePath => path.join(dirPath, relativePath))];
    } catch (x) {
      console.error(`Ignore: ${ignoreJSONPath} is invalid.`);
    }
  }

  fs.readdirSync(dirPath).forEach(file => {
    let filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      queryPluginDirectory(filePath, pluginFileCallback, ignore);

      return;
    }

    if (path.extname(file) !== '.js')
      return;

    if (ignore.includes(filePath)) {
      console.debug(`[NOTICE] Loading of ${file} canceled, included in ignore.json.`);

      return;
    }

    pluginFileCallback(filePath);
  });
}

exports.loadPlugins = dirPath => {
  let _setInterval = setInterval;
  global.setInterval = (handler, timeout, arguments) => {
    intervals.push(_setInterval(handler, timeout, arguments));
  };

  queryPluginDirectory(dirPath, exports.loadPlugin);

  global.setInterval = _setInterval;
};

exports.disablePlugins = () => {
  global.client.eventNames().forEach(eventName => {
    global.client.removeAllListeners(eventName);
  });

  intervals.forEach(timeout => {
    clearInterval(timeout);
  });

  // Clears all require cache, inefficient, hence the recommendation of development use only.
  Object.keys(require.cache).forEach(cacheKey => {
    delete require.cache[cacheKey];
  });

  Object.keys(global.plugins).forEach(pluginFile => {
    let plugin = global.plugins[pluginFile];
    console.debug(`Unloading ${pluginFile}...`);
    if (plugin.hasOwnProperty('onDisable'))
      plugin.onDisable();
  });

  global.plugins = [];
};