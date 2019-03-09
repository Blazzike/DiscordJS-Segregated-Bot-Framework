exports.onReady = () => {
  global.client.on('message', msg => {
    if (msg.author.bot) return;

    // Commands
    if (msg.content.length > 1 && msg.content.toLowerCase().startsWith(global.options.commandPrefix.toLowerCase())) {
      let args = msg.content.split(' ');
      let label = args[0].substr(global.options.commandPrefix.length);
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

          labels = labels.map(label => label.toLowerCase());

          if (!labels.includes(label.toLowerCase()))
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