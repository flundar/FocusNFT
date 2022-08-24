const fs = require("fs")
exports.run = (client, message, args) => {
  let user = message.mentions.members.first()
  var guild = message.guild
  guild.invites.fetch().then((invites) => {
    invites.forEach((invite) => {
      var count = invite.uses ?? 0
      var code = invite.code ?? "can't found invite code"
      var inviter = invite.inviter
      var username = inviter.username ?? "can't founded any invite"
      if(inviter) {
        if (user) {
          if (!message.member.roles.cache.find(r => r.id === "1009074068768690207")) return message.channel.send("u don't have a permission for that.");
          if(user.id == inviter.id){
            message.channel.send(`<@${inviter.id}> \nHas invited: ${count} Om \ndiscord.gg/${code}`)
            console.log("founded")
          }
        } else {
          if(message.author.id == inviter.id){
            message.channel.send(`<@${inviter.id}> \nHas invited: ${count} Om \ndiscord.gg/${code}`)
            console.log("founded")
          }
        }
      } else {

      }
    

    })

  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'invite',
  description: '[Admin Komutu]',
  usage: 'invite parameter'
};