# Discord.js Segregated Bot Framework
Discord.js Plugin loading Bot Framework

## Contributing
1. Fork the repository
2. Clone that repository. (`git clone https://github.com/*/DiscordJS-Segregated-Bot-Framework.git`)
3. Make and commit changes.
4. Open pull request.

## Plugin API
To create a new plugin, simply add a new JS file into the `plugins/` directory.

### ignore.json
`ignore.json` can be added to any directory within plugins/ including plugins/ itself. It is a file containing a JSON array of globs to be ignored when loading plugins.

#### Example Usage
```json
[
  "**/*Command.js",
  "!**/HelpCommand.js"
]
```
The above ignore.json would ignore all JS files ending in `Command` except from `HelpCommand.js`.

### `function` exports.onEnable
Called upon the plugin being loaded/enabled.

#### Example Usage
```js
exports.onEnable = () => {
  console.log("Enabled plugin.");
};
```

### `function` exports.onReady
Called upon all plugins being loaded.

#### Example Usage
```js
exports.onReady = () => {
  console.log("There are", Object.keys(global.plugins).length, "plugins ready.");
};
```

### `function` exports.onDisable
Called upon the plugin being unloaded/disabled.

#### Example Usage
```js
exports.onDisable = () => {
  console.log("Disabled plugin.");
};
```

### `discord.js#Client` global.client
The current Discord.js session's client class, accessible anywhere.

### `object` global.options
The options set within the options.js file. 

### `discord.js` global.discord
Discord.js required instance, alternative to `require('discord.js')`. 

### `object` global.plugins

An object of plugin instances, these instances are in the following form:
`PluginFileName: Exported properties.`

## Commands.js API
### `object` exports.commands
#### Example usage:
```js
exports.commands = {
  label: {
    aliases: ['alias'],
    exec: (label, args, msg) => {
      return "Response.";
    }
  }
};
```

### Command Properties
#### `array` aliases
An array of alternative labels for a user to execute the command.

#### `function` exec
The function to be called when a command is called by a user.

| Parameter                | Description                                                       |
|--------------------------|-------------------------------------------------------------------|
| `string` label           | The alias used to execute the command.                            |
| `array` args             | The parameters sent to the command.                               |
| `discord.js#Message` msg | The message instance used to execute the command from discord.js. |

`HelpCommand.js` uses the following additional properties:
  - `boolean` hidden - If true, the command will not be shown in the help command response.
  - `boolean` includeAliasesInHelp - If true, aliases will also be shown in the help menu.
  - `string` description - The description of the command.
  - `array` parameters - Possible parameters users can give to the command.
  - `string` category - The category for the command to be displayed in.

For a full command plugin example see `plugins/commands/CoinCommand/`.