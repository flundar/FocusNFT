const fs = require("fs")
exports.run = (client, message, args) => {
  var level
  let user = message.mentions.members.first()

  if (!user) {
    var exist = client.level.hasOwnProperty(message.author.id)
    if (exist) {
      level = client.level[message.author.id].level
    } else {
      level = "No Level"
    }
    message.channel.send(`level is : ${level}`)
  } else {
    if (!message.member.roles.cache.find(r => r.id === "1009074068768690207")) return message.channel.send("u don't have a permission for that.");
    var exist = client.level.hasOwnProperty(user.id)
    if (exist) {
      level = client.level[user.id].level
    } else {
      level = "No Level"
    }
    message.channel.send(`level is : ${level}`)
  }


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'level',
  description: '[Admin Komutu]',
  usage: 'level parameter'
};