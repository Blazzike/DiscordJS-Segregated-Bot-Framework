exports.onReady = () => {
  global.client.on('message', msg => {
    if (msg.author.bot) return;

    // Commands
    if (msg.content.length > 1 && msg.content.startsWith(global.options.commandPrefix)) {
      let args = msg.content.split(' ');
      let label = args[0].substr(1);
      args.shift();

      let responded = false;
      Object.values(plugins).forEach(plugin => {
        if (!plugin.hasOwnProperty('commands'))
          return;

        Object.keys(plugin.commands).forEach(clabel => {
          let cmd = plugin.commands[clabel];
          let labels = [clabel];

          if (cmd.hasOwnProperty('aliases'))
            labels.push(...cmd.aliases);

          if (!labels.includes(label))
            return;

          responded = true;

          let response = cmd.exec(label, args, msg);
          if (typeof response === 'undefined' || response.length === 0)
            return;

          msg.reply(response);
        });
      });

      if (!responded)
        msg.reply('Unknown command!');
    }
  });
};