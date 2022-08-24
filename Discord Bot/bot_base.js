// REQUIRE
const Discord = require('discord.js');
const {
  Client,
  Collection,
  Intents,
  MessageEmbed
} = Discord;
// Create a new client instance

const client = new Client({
  partials: [
    "CHANNEL"
  ],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
});

const chalk = require('chalk');
const fs = require('fs');
const ms = require("ms");
const moment = require('moment');
require("moment-duration-format");
require('./util/eventLoader')(client);
const {
  ifError
} = require('assert');
const {
  json
} = require('body-parser');
client.settings = require('./settings.json');
client.level = require('./level.json');
// REQUIRE



setInterval(() => {
  fs.copyFile(
    'level.json',
    'backuplevel.json',
    (err) => console.error
  );
}, 10000);



const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


client.on('rateLimit', (info) => {
  //  console.log(`Rate limit hit | timeout ? ${info.timeout} | limit ? ${info.limit} | method ? ${info.method} | route ? ${info.route}`)
})


client.on("ready", () => {
  setInterval(() => {
    client.user.setActivity(client.settings.status, {
      type: "STREAMING",
      url: "https://www.twitch.tv/flundarr"
    });
  }, 2000);
});


client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {
    try {
      let guild = interaction.guild
      let verifrole = guild.roles.cache.find(r => r.id === client.settings.verifyrole);
      let canverif = guild.roles.cache.find(r => r.id === client.settings.canverifyrole);
      if (interaction.customId == "verify_button") {
        if (interaction.member.roles.cache.find(r => r.id === verifrole.id)) {
          interaction.member.roles.remove(verifrole);
          interaction.member.roles.add(canverif);
          interaction.reply({
            content: "Removed!",
            ephemeral: true
          })
        } else {
          interaction.member.roles.add(verifrole);
          interaction.member.roles.remove(canverif);
          interaction.reply({
            content: "Confirmed!",
            ephemeral: true
          })
        }
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing the button script !',
        ephemeral: true
      });
    }
  } else {
    return;
  }
})


// FLUNDAR DURUM


client.on('guildMemberAdd', async (member) => {

  
 
  let kanal = client.channels.cache.get(client.settings.welcomechannel);
  let preverif = client.channels.cache.get("1011995304280731719")

  if (!preverif) return;
  if (!kanal) return;

  let bitiş = member.user.createdAt
  let günü = moment(new Date(bitiş).toISOString()).format('DD')
  let ayı = moment(new Date(bitiş).toISOString()).format('MM').replace("01", "January").replace("02", "February").replace("03", "March").replace("04", "April").replace("05", "May").replace("06", "June").replace("07", "July").replace("08", "August").replace("09", "September").replace("10", "October").replace("11", "November").replace("12", "December")
  let yılı = moment(new Date(bitiş).toISOString()).format('YYYY')
  let saati = moment(new Date(bitiş).toISOString()).format('HH:mm')

  let günay = `${günü} ${ayı} ${yılı} ${saati}`

  let süre = member.user.createdAt
  let gün = moment(new Date(süre).toISOString()).format('DD')
  let hafta = moment(new Date(süre).toISOString()).format('WW')
  let ay = moment(new Date(süre).toISOString()).format('MM')
  let ayy = moment(new Date(süre).toISOString()).format('MM')
  let yıl = moment(new Date(süre).toISOString()).format('YYYY')
  let yıl2 = moment(new Date().toISOString()).format('YYYY')

  let netyıl = yıl2 - yıl

  let created = ` ${netyıl} years  ${ay} months ${hafta} weeks ${gün} day ago`
  var myDate = new Date(süre);
  var result = myDate.getTime();

  let kontrol;
  let renk;
  let info;
  let suankizaman = Date.now() - 1296000000

  if (result > suankizaman) {
    renk = 'RED'
    kontrol = 'This account is suspecious!'
    info = 'No information user going to be kicked from server.'
  } else {
    renk = 'GREEN'
    kontrol = 'This account is trusted.'
    info = '<@' + member.id + '> Info : \n\n  Create Date **[' + created + ']** (`' + günay + '`) \n\n Account Status : **' + kontrol + '**'
  }

  let gelenlog = new MessageEmbed()
    .setColor(renk)
    .setTitle(`${member.user.username} Joined`)
    .setDescription(info)
    .setImage(member.user.displayAvatarURL())
    .setTimestamp()
 await kanal.send({
    embeds: [gelenlog]
  });
  if(result > suankizaman) return  member.kick();
  let sozcukler = ["apple", "red", "car", "raccoon", "headphone", "computer", "cooler", "sun", "moon", "light", "jupiter", "phone", "nft", "goat", "monitor", "orange", "blue", "green", "darkblue"]
  var takenSozcuk = sozcukler[Math.floor(Math.random() * sozcukler.length)];
  let normalChatMessage = [`You need to write "${takenSozcuk}" to unlock verify.`, `Write "${takenSozcuk}" to gain verify access.`, `"${takenSozcuk}" Write the first sentence for take access to verify.`]
  var anormalChatMessage = normalChatMessage[Math.floor(Math.random() * normalChatMessage.length)];
  
  const filter = m => m.author.id === member.user.id
  var godtierDelete
  const embed = new MessageEmbed()
    .setThumbnail(member.user.AvatarURL)
    .setDescription(`<@${member.user.id}> ${anormalChatMessage}`)
    .setColor('GREEN')
    .setTimestamp()
  preverif.send({
    embeds: [embed]
  }).then((msg) => {
    godtierDelete = msg
    preverif.awaitMessages({
        filter,
        max: 1,
        time: 60_000,
        errors: ['time']
      })
      .then(message => {
        message = message.first()
        let verifrole = message.guild.roles.cache.find(r => r.id === "1009444432598270003");
        if (message.author.id == member.user.id) {
          if (message.content.length >= 3) {
            if (message.content == takenSozcuk) {
              member.roles.add(verifrole);
              godtierDelete.delete().catch((err) => {
                console.log(err)
              })
              message.delete().catch(console.error);
            } else {
              message.reply("wrong")
            }
          } else {
            message.reply("nah can't be")
          }
        }
      })
      .catch(collected => {
        member.kick();
        godtierDelete.delete()
      });
  })
})

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};











//PM

// client.on("messageCreate", message => {
//   if (message.author.bot) return;
//   if (message.channel.type === 'DM') {
//     try {
//       const oda = client.channels.cache.get("1002876955730919474");
//       const embed1 = new MessageEmbed()
//         .setThumbnail(message.author.AvatarURL)
//         .setAuthor({
//           name: 'PM MESAJI',
//           iconURL: message.author.AvatarURL
//         })
//         .addField('Kullanıcı Adı', message.author.username)
//         .addField('Kullanıcı ID', message.author.id)
//         .addField('Kullanıcı(Etiketlenmiş)', `<@${message.author.id}>`)
//         .addField('Mesaj İçeriği', message.content)
//         .setTimestamp()
//         .setFooter({
//           text: 'Stajyer'
//         })
//       return oda.send({
//         embeds: [embed1]
//       });
//     } catch (e) {
//       console.log("HATA YAKALANDI: " + e)
//     }
//   }
// });



client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};




client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.permissions.has("CHANGE_NICKNAME")) permlvl = 1;
  if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
  if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === client.settings.sahip) permlvl = 4;
  if (message.author.id === client.settings.sahip2) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

function capslock(string) {
  if (string.toUpperCase() == string) {
    return true;
  } else return false;
};
//capslock



client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});




client.on("messageReactionRemove", function (messageReaction, user) {
  console.log(`a reaction is removed from a message ${user}`);
});


// KONTROL
client.on('messageCreate', message => {
  if (message.author.bot) {
    return;

  } else if (message.content == '') {
    return;

  } else if (message.channel.type === 'DM') {
    return;

  }
  let dataonlyimage = client.settings["onlyimage"]

  for (let i = 0; i < dataonlyimage.length; i++) {
    if (!dataonlyimage[i]) continue

    if (message.channel.id == dataonlyimage[i]) {
      if (/^(http|https):\/\/.*\.(png|jpg|jpeg)$/i.test(message.content)) {
        message.react('484656592541974538');
        message.react('484656592541712384');
      } else {
        message.delete().catch(error => {
          console.log(`Şu kullanıcının mesajı silinemedi: ${message.author.username} hata: ${error}`)
        })
      }
    }
  }

  if (message.channel.id == 1011995304280731719) return
    var levelControl = client.level.hasOwnProperty(message.author.id)
    var count
    var level
    if (levelControl) {
      count = client.level[message.author.id].count
      level = client.level[message.author.id].level
      client.level[message.author.id].count = count + 1
      fs.writeFile("./level.json", JSON.stringify(client.level, null, 4), async err => {
        if (err) throw err;
      });

    } else {
      count = 0
      level = 0
      client.level[message.author.id] = {
        userid: message.author.id,
        guild: message.guild.id,
        count: count + 1,
        level: level,
      }
      fs.writeFile("./level.json", JSON.stringify(client.level, null, 4), async err => {
        if (err) throw err;
      });
    }


    var levelCount = client.settings["levels"]
    if (level == levelCount[level].level) {
      console.log(message.author.username, level, count)
      if (count >= levelCount[level].count) {
        const embed = new MessageEmbed()
          .setThumbnail(message.author.AvatarURL)
          .setDescription(`Cheers! You got a new level: ${level + 1}`)
          .setColor('GREEN')
          .setTimestamp()
        message.channel.send({
          embeds: [embed]
        });
        client.level[message.author.id].level = level + 1
        client.level[message.author.id].count = 0
        fs.writeFile("./level.json", JSON.stringify(client.level, null, 4), async err => {
          if (err) throw err;
        });
      }
    }

});

function EpochToDate(epoch) {
  if (epoch < 10000000000)
    epoch *= 1000;
  var epoch = epoch + (new Date().getTimezoneOffset() * -1);
  return new Date(epoch);
}
client.login(client.settings.token);