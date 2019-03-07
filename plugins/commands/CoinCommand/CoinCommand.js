exports.commands = {
  coin: {
    description: 'Flips a coin, heads or tails?',
    category: 'Fun',
    exec: (label, args, msg) => {
      let result = Math.random() >= 0.5;
      msg.channel.send(result ? 'Heads!' : 'Tails!', {
        files: [{
          attachment: `${__dirname}/${result ? 'heads.png' : 'tails.png'}`,
          name: result ? 'Heads.png' : 'Tails.png'
        }]
      }).catch(console.error);
    }
  }
};