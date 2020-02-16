module.exports = {
  name: 'ReloadConsoleCommand',
  depends: ['Console'],
  console: {
    commands: {
      reload: {
        description: 'Just kills the shard as a method of reloading.',
        aliases: ['rl'],
        exec() {
          process.exit(0);
        }
      }
    }
  }
};