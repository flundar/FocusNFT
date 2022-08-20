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
client.muted = require("./muted.json");
client.settings = require('./settings.json');
// REQUIRE







const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


client.on('rateLimit', (info) => {
  //  console.log(`Rate limit hit | timeout ? ${info.timeout} | limit ? ${info.limit} | method ? ${info.method} | route ? ${info.route}`)
})


client.on("ready", () => {
  // let verify = client.channels.cache.get('1009436598900883527')
  // const embedopen = new Discord.MessageEmbed()
  //   .setDescription(`Click the button below to verify yourself! ⬇`)
  //   .setTitle(`FOCUS Verification`)
  //   .setColor(0x00FFFF)
  //   .setTimestamp()
  // const row = new Discord.MessageActionRow()
  //   .addComponents(
  //     new Discord.MessageButton()
  //     .setLabel("Verify")
  //     .setCustomId("verify_button")
  //     .setEmoji('✔')
  //     .setStyle("SUCCESS")
  //   )
  // verify.send({
  //   embeds: [embedopen],
  //   components: [row]
  // })
  setInterval(() => {
    client.user.setActivity(client.settings.status, {
      type: "STREAMING",
      url: "https://www.twitch.tv/flundarr"
    });
  }, 2000);

});


client.on('interactionCreate', async interaction => {
  if(interaction.isButton()) {
      try {
        let guild = client.guilds.cache.get("1009072912143241217");
        let verifrole = guild.roles.cache.find(r => r.id === "1009434525413146666");
          if(interaction.customId == "verify_button"){
            interaction.member.roles.add(verifrole);
            interaction.reply({content:"Confirmed!" , ephemeral: true })
          }
      } catch (error) {
          console.error(error);
          await interaction.reply({ content: 'There was an error while executing the button script !', ephemeral: true});
      }
  } else {
      return;
  }
})

setInterval(() => {

  mutekontrol();

}, 25000)

async function mutekontrol() {

  for (let i in client.muted) {
    try {
      let time = client.muted[i].time;
      let guildId = client.muted[i].guild;
      let guild = client.guilds.cache.get(guildId);
      let member = await guild.members.fetch(client.muted[i].userid);

      let mutedRole = guild.roles.cache.find(r => r.id === "435831461287952394");
      if (!mutedRole) continue;


      if (Date.now() > time) {

        member.roles.remove(mutedRole);
        console.log("Mute revoked:  " + member.user.tag);
        client.muted[i] = {
          mute: false,
          userid: client.muted[i].userid,
          reason: client.muted[i].reason,
          unmuted: "Stajyer",
          mutetime: client.muted[i].time,
          unmutetime: Date.now()
        }

        fs.writeFile("./muted.json", JSON.stringify(client.muted, null, 4), err => {
          if (err) throw err;
        });
      } else {
        try {
          if (member.roles.cache.has(mutedRole.id)) {
            console.log("Member already has the role " + member.user.tag)
          } else {
            member.roles.add(mutedRole);
            console.log("Quit when muted:  " + member.user.tag);
            member.send('Bi akıllı sensin coni al sana bi CEZALI vereyim.')
          }
        } catch (e) {
          console.log("Cannot give role to member: " + e)
        }
      }


    } catch (e) {

    }
  }
}





async function sunucudancikmutekontrol() {
  console.log("New member arrived. Controlling for mute.")
  try {
    for (let i in client.muted) {
      let time = client.muted[i].time;
      let guildId = client.muted[i].guild;
      let guild = client.guilds.cache.get(guildId);
      let member = await guild.members.get(client.muted[i].userid);
      let mutevar = client.muted[i].guild;

      let mutedRole = guild.roles.cache.find(r => r.id === "435831461287952394");
      if (!mutedRole) continue;
      if (Date.now() < time) {
        if (member.roles.cache.has(mutedRole.id)) {
          return;
        }
        console.log(member)
        member.roles.add(mutedRole);
        console.log("Quit when muted:  " + member.user.tag);
        member.send('Bi akıllı sensin coni al sana bi muted.').catch(error => {
          console.log(error)
        })
      }
    }
  } catch (error) {
    console.log(ifError)
  }
}



// FLUNDAR DURUM


client.on('guildMemberAdd', async (member) => {
  sunucudancikmutekontrol(member)
  let kanal = client.channels.cache.get('818282332993617990');
  if (!kanal) return;

  let aylar = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  }

  let bitiş = member.user.createdAt
  let günü = moment(new Date(bitiş).toISOString()).format('DD')
  let ayı = moment(new Date(bitiş).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık").replace("13", "CodAre") //codare
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

  let created = ` ${netyıl} yıl  ${ay} ay ${hafta} hafta ${gün} gün önce`

  let kontrol;
  if (süre < 1296000000) kontrol = 'Bu hesap şüpheli!'
  if (süre > 1296000000) kontrol = 'Bu hesap güvenli!'

  let gelenlog = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(`${member.user.username} Katıldı`)
    .setDescription('<@' + member.id + '> Bilgileri : \n\n  Hesap oluşturulma tarihi **[' + created + ']** (`' + günay + '`) \n\n Hesap durumu : **' + kontrol + '**')
    .setTimestamp()
  kanal.send({
    embeds: [gelenlog]
  });

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

client.on("messageCreate", message => {
  if (message.author.bot) return;
  if (message.channel.type === 'DM') {
    try {
      const oda = client.channels.cache.get("1002876955730919474");
      const embed1 = new MessageEmbed()
        .setThumbnail(message.author.AvatarURL)
        .setAuthor({
          name: 'PM MESAJI',
          iconURL: message.author.AvatarURL
        })
        .addField('Kullanıcı Adı', message.author.username)
        .addField('Kullanıcı ID', message.author.id)
        .addField('Kullanıcı(Etiketlenmiş)', `<@${message.author.id}>`)
        .addField('Mesaj İçeriği', message.content)
        .setTimestamp()
        .setFooter({
          text: 'Stajyer'
        })
      return oda.send({
        embeds: [embed1]
      });
    } catch (e) {
      console.log("HATA YAKALANDI: " + e)
    }
  }
});



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

  } else if (message.member.permissions.has("BAN_MEMBERS")) {
    return;
  }
});

function EpochToDate(epoch) {
  if (epoch < 10000000000)
    epoch *= 1000;
  var epoch = epoch + (new Date().getTimezoneOffset() * -1);
  return new Date(epoch);
}
client.login(client.settings.token);