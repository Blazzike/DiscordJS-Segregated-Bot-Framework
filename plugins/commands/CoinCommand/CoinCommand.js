const config = require('./config.js');

exports.commands = {
  coin: {
    description: config.locale[config.language].description,
    category: 'Fun',
    exec: (label, args, msg) => {
      let result = Math.random() >= 0.5;
      msg.channel.send(result ? config.locale[config.language].heads : config.locale[config.language].tails, {
        files: [{
          attachment: `${__dirname}/${result ? 'heads.png' : 'tails.png'}`,
          name: result ? 'Heads.png' : 'Tails.png'
        }]
      }).catch(console.error);
    }
  }
};