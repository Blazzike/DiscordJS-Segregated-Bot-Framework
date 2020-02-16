module.exports = {
  name: process.env.NAME || 'SegregatedBot',
  token: process.env.TOKEN || '',
  shards: process.env.SHARDS || 'auto',
  plugins: [
    'Activity',
    'Commands',
    'commands/HelpCommand',
    'commands/CoinCommand',
    'commands/PingCommand',
    'Console',
    'consoleCommands/PluginsConsoleCommand',
    'consoleCommands/SayConsoleCommand',
    'consoleCommands/ReloadConsoleCommand'
  ]
};
