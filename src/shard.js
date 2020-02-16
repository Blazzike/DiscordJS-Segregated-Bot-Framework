const config = require('./config');
const {Client} = require('discord.js');
const {log, LogType} = require('./util');
const PluginUtil = require('./util/plugin');

const client = new Client();

const eventNames = [
  'channelCreate',
  'channelDelete',
  'channelPinsUpdate',
  'channelUpdate',
  'clientUserGuildSettingsUpdate',
  'clientUserSettingsUpdate',
  'debug',
  'disconnect',
  'emojiCreate',
  'emojiDelete',
  'emojiUpdate',
  'error',
  'guildBanAdd',
  'guildBanRemove',
  'guildCreate',
  'guildDelete',
  'guildIntegrationsUpdate',
  'guildMemberAdd',
  'guildMemberAvailable',
  'guildMemberRemove',
  'guildMembersChunk',
  'guildMemberSpeaking',
  'guildMemberUpdate',
  'guildUnavailable',
  'guildUpdate',
  'message',
  'messageDelete',
  'messageDeleteBulk',
  'messageReactionAdd',
  'messageReactionRemove',
  'messageReactionRemoveAll',
  'messageUpdate',
  'presenceUpdate',
  'rateLimit',
  'ready',
  'reconnecting',
  'resume',
  'roleCreate',
  'roleDelete',
  'roleUpdate',
  'typingStart',
  'typingStop',
  'userNoteUpdate',
  'userUpdate',
  'voiceStateUpdate',
  'warn',
  'webhookUpdate'
];

for (const eventName of eventNames) {
  client.on(eventName, (...args) => {
    PluginUtil.clientEventHandler(eventName, ...args);
  });
}

client.once('ready', () => {
  log(LogType.INFO, 'Loading plugins...');
  PluginUtil.loadPlugins();

  console.log('');
  log(LogType.INFO, `=== ${client.user.tag} ===`);
  log(LogType.INFO, `Loaded plugins: ${Object.keys(PluginUtil.plugins).length}`);
});

process.on('SIGINT', () => {
  log(LogType.INFO, 'Disabling plugins...');

  PluginUtil.unloadPlugins();

  process.exit();
});

console.debug('Connecting to Discord...');
client.login(config.token);

module.exports = {
  client
};