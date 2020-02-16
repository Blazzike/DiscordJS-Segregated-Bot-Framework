# Discord.js Segregated Bot Framework
Discord.js Plugin loading Bot Framework

## Contributing
1. Fork the repository
2. Clone that repository. (`git clone https://github.com/*/DiscordJS-Segregated-Bot-Framework.git`)
3. Run `npm install` in cloned directory.
4. Run `npm run start` to start the bot (include TOKEN environment variable!).
4. Make and commit changes.
6. Open pull request.

## Plugin API
To create a new plugin, add a new plugin JS file into the `plugins/` directory then add said plugin path excluding plugins/ and the .js extension to config.js.

### `function` exports.enable
Called upon the plugin being loaded/enabled.

#### Example Usage
```js
module.exports = {
  name: 'Demo',
  enable() { 
    console.log('Enabled plugin.');
  }
};
```

### `function` exports.disable
Called upon the plugin being disabled.

#### Example Usage
```js
module.exports = {
  name: 'Demo',
  disable() { 
    console.log('Disabled plugin.');
  }
};
```

### Accessing the discord.js client.
The discord.js client is exported by shard.js.

#### Example Usage
```js
const {client} = require('../shard');
```

### discord.js client events
discord.js' client events are automatically called properties of a plugin.

#### Example Usage
```js
module.exports = {
  name: 'Demo',
  message(msg) {
    msg.reply('Hello!'); // Note this will cause a loop.
  }
}
```

You may also register events through the client, although this should be avoided. If this is done, ensure you unregister on disable.

## Commands.js API
### `object` exports.commands
#### Example usage:
```js
module.exports = {
  commands: {
    label: {
      aliases: ['alias'],
      exec: (label, args, msg) => {
        return 'Response.';
      }
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