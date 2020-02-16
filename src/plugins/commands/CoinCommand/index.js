const config = {
  language: 'en', // Try 'de' for German translations!
  locale: {
    en: {
      heads: 'Heads!',
      tails: 'Tails!',
      description: 'Flips a coin, heads or tails?'
    },
    de: {
      heads: 'Kopf!',
      tails: 'Zahl!',
      description: 'Wirft eine Münze, Kopf oder Zahl?'
    }
  }
};

module.exports = {
  name: 'CoinCommand',
  depends: ['Commands'],
  commands: {
    coin: {
      description: config.locale[config.language].description,
      category: 'Fun',
      exec(label, args, msg) {
        const heads = Math.random() >= 0.5;
        msg.channel.send(heads ? config.locale[config.language].heads : config.locale[config.language].tails, {
          files: [{
            attachment: `${__dirname}/${heads ? 'heads.png' : 'tails.png'}`,
            name: heads ? 'Heads.png' : 'Tails.png'
          }]
        }).catch(console.error);
      }
    }
  }
};