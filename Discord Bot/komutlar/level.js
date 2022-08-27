const fs = require("fs")
const Discord = require('discord.js');
const {
  Client,
  Collection,
  Intents,
  MessageEmbed
} = Discord;
const {
  QuickDB
} = require('quick.db-9.0.0');
const db = new QuickDB();
exports.run = async (client, message, args) => {
  var level
  var parameter = args[0]
  let user = message.mentions.members.first()
  var newmessage = "\n"
  if (parameter) {
    if (parameter == "list") {
      var data = await db.get(`levels`)
      for (const i in sortData("level", data, 'desc')) {
        newmessage += await `NAME: <@${data[i].userid}> LEVEL: ${data[i].level}\n`
      }
      const embed = new MessageEmbed()
        .setThumbnail(message.author.AvatarURL)
        .setDescription(`${newmessage}`)
        .setColor('GREEN')
      message.channel.send({
        embeds: [embed]
      });
    }
  } else {
    if (!user) {
      var exist = client.level.hasOwnProperty(message.author.id)
      if (exist) {
        level = client.level[message.author.id].level
      } else {
        level = "No Level"
      }
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setThumbnail(message.author.AvatarURL)
        .setDescription(`<@${message.author.id}> your level is : ${level}`)

      message.channel.send({
        embeds: [embed]
      })
    } else {
      if (!message.member.roles.cache.find(r => r.id === "1009074068768690207")) return message.channel.send("u don't have a permission for that.");
      var exist = client.level.hasOwnProperty(user.id)
      if (exist) {
        level = client.level[user.id].level
      } else {
        level = "No Level"
      }
      const embed = new MessageEmbed()
        .setThumbnail(message.author.AvatarURL)
        .setColor('GREEN')
        .setDescription(`<@${message.author.id}>'s level is : ${level}`)

      message.channel.send({
        embeds: [embed]
      })
    }
  }

  function sortData(key, data, type) {
    let ordered = {};
    let compareFunction = function (a, b) {
      return data[b][key] - data[a][key];
    };
    if (type === "asc") {
      compareFunction = function (a, b) {
        return data[a][key] - data[b][key];
      }
    }
    Object.keys(data).sort(compareFunction).forEach(function (key) {
      ordered[key] = data[key];
    });
    return ordered;
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