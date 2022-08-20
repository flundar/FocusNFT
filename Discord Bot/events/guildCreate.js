const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('../settings.json');

var prefix = settings.prefix;

const girismesaj = [
  'Botumuzun özelliklerini öğrenmek için !yardım komutunu kullanabilirsin.',
  '**ÖNEMLİ:** Botun kullanması için mod-log kanalı açın ve deneme için'
]

client.on('guildCreate', guild => {
    const generalChannel = guild.defaultChannel
    generalChannel.sendMessage(girismesaj)
	
})
