const fs = require("fs")
const Discord = require('discord.js');
const {
  Client,
  Collection,
  Intents,
  MessageEmbed
} = Discord;
exports.run = (client, message, args) => {
  let inviteList = args[0]
  var guild = message.guild
  if (inviteList == "list") {
    var mesaj = "\n"
    guild.invites.fetch().then((invites) => {
      invites.forEach((invite) => {
        var count = invite.uses ?? 0
        var code = invite.code ?? "can't found invite code"
        var inviter = invite.inviter
        var username = inviter.username ?? "can't founded any invite"
        mesaj += `Name: ${username} Code: ${code} Usage: ${count}\n`
      })
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setThumbnail(message.author.AvatarURL)
        .setDescription(mesaj)
        .setTimestamp()
      message.channel.send({
        embeds: [embed]
      })
    })
  } else {
    let user = message.mentions.members.first()
    guild.invites.fetch().then((invites) => {
      invites.forEach((invite) => {
        var count = invite.uses ?? 0
        var code = invite.code ?? "can't found invite code"
        var inviter = invite.inviter
        var username = inviter.username ?? "can't founded any invite"
        if (inviter) {
          if (user) {
            if (!message.member.roles.cache.find(r => r.id === "1009074068768690207")) return message.channel.send("u don't have a permission for that.");
            if (user.id == inviter.id) {
              const embed = new MessageEmbed()
                .setColor('GREEN')
                .setThumbnail(message.author.AvatarURL)
                .setDescription(`<@${inviter.id}> \nHas invited: ${count} Om \ndiscord.gg/${code}`)
                .setTimestamp()
              message.channel.send({
                embeds: [embed]
              })
            }
          } else {
            if (message.author.id == inviter.id) {
              const embed = new MessageEmbed()
                .setThumbnail(message.author.AvatarURL)
                .setDescription(`<@${inviter.id}> \nHas invited: ${count} Om \ndiscord.gg/${code}`)
                .setTimestamp()
              message.channel.send({
                embeds: [embed]
              })
            }
          }
        } else {
          const embed = new MessageEmbed()
            .setThumbnail(message.author.AvatarURL)
            .setDescription(`Couldn't found invite!`)
            .setTimestamp()
          message.channel.send({
            embeds: [embed]
          })
        }
      })
    })
  }


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