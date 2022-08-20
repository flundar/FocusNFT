const fs = require("fs")
exports.run = (client, message, args) => {
  let parameter = args[0]  //args.slice(0).join(' ');

  if(parameter == "welcome"){
    let welcomemessage = args.slice(1).join(' ');
    if(welcomemessage){
      client.settings["welcome"] = welcomemessage
      message.channel.send("Welcome message setted!")
    }else{
      message.channel.send("No arg founded.")
    }
   
  } else if(parameter == "status"){
    let status = args.slice(1).join(' ');
    if(status){
      client.settings["status"] = status
      message.channel.send("Status message setted!")
    }else{
      message.channel.send("No arg founded.")
    }

  }

  fs.writeFile("./settings.json", JSON.stringify(client.settings, null, 4), async err => {
    if (err) throw err;
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'settings',
  description: '[Admin Komutu]',
  usage: 'settings parameter'
};