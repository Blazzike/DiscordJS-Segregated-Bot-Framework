exports.commands = {
  help: {
    aliases: ['commands'],
    description: 'Simple help command.',
    category: 'Useful',
    exec: (label, args, msg) => {
      let categories = {};
      Object.values(global.plugins).forEach(plugin => {
        if (!plugin.hasOwnProperty('commands'))
          return;

        let commands = plugin.commands;
        Object.keys(commands).forEach(label => {
          let cmd = commands[label];
          if (cmd.hasOwnProperty('hidden') && cmd.hidden)
            return;

          if (!categories.hasOwnProperty(cmd.category))
            categories[cmd.category] = '';

          categories[cmd.category] += `?${label}${cmd.hasOwnProperty('includeAliasesInHelp')
          && cmd.includeAliasesInHelp ? `, ${cmd.aliases.join(', ')}` : ''} ${cmd.hasOwnProperty('parameters') ?
            `*${cmd.parameters.join(' ')}* ` : ''}**${cmd.description}**\n`;
        });
      });

      let response = '';
      Object.keys(categories).forEach(category => {
        response += `__**${category}**__\n${categories[category]}\n`;
      });

      msg.channel.send(new global.discord.RichEmbed()
        .setTitle(global.options.name + ' Commands')
        .setColor(global.options.themeColor)
        .setDescription(response.substr(0, response.length - 1)));
    }
  }
};