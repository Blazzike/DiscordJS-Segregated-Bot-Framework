# Discord.js Segregated Bot Framework
Discord.js Plugin loading Bot Framework

## Contributing
1. Fork the repository
2. Clone that repository. (`git clone https://github.com/*/DiscordJS-Segregated-Bot-Framework.git`)
3. Make and commit changes.
4. Open pull request.

## Plugin API
To create a new plugin, simply add a new JS file into the `plugins/` directory.

### exports.onEnable()
Called upon the plugin being loaded/enabled.

No parameters given.

### exports.onDisable()
Called upon the plugin being unloaded/disabled.

No parameters given.

### `discord.js#Client` client
The current Discord.js session's client class, accessible anywhere.

### `object` options
The options set within the options.js file. 

### `array` plugins

An array of plugin instances, these instances are in the form of an object.

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
| Parameter            | Description                                                       |
|----------------------|-------------------------------------------------------------------|
| `string` label       | The alias used to execute the command.                            |
| `array` args         | The parameters sent to the command.                               |
| `discord.js#Message` | The message instance used to execute the command from discord.js. |
The function to be called when a command is called by a user.

`HelpCommand.js` uses the following additional properties:
  - `boolean` hidden - If true, the command will not be shown in the help command response.
  - `boolean` includeAliasesInHelp - If true, aliases will also be shown in the help menu.
  - `string` description - The description of the command.
  - `array` parameters - Possible parameters users can give to the command.
  - `string` category - The category for the command to be displayed in.