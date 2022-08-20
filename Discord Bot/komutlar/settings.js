const fs = require("fs")
exports.run = (client, message, args) => {
  let parameter = args[0] //args.slice(0).join(' ');

  if (parameter == "welcome") {
    let welcomemessage = args.slice(1).join(' ');
    if (welcomemessage) {
      client.settings["welcome"] = welcomemessage
      message.channel.send("Welcome message setted!")
    } else {
      message.channel.send("No arg founded.")
    }

  } else if (parameter == "status") {
    let status = args.slice(1).join(' ');
    if (status) {
      client.settings["status"] = status
      message.channel.send("Status message setted!")
    } else {
      message.channel.send("No arg founded.")
    }

  } else if (parameter == "image") {
    let onlyimagechannel = args[1]
    if (onlyimagechannel) {
      client.settings["onlyimage"].push(onlyimagechannel)
      message.channel.send("channel id added to onlyimage system")
    }
  } else if (parameter == "resetimage") {
    let number = args[1]
    if (number) {
      number = number - 1
      delete client.settings["onlyimage"][number]
      message.channel.send("channel deleted from onlyimage")
    } else {
      let onlyimagechannels = client.settings["onlyimage"]
      let sendingmessage = ``
      for (let i = 0; i < onlyimagechannels.length; i++) {
        if(!onlyimagechannels[i]) continue
        sendingmessage += `${onlyimagechannels[i]} number ${i+1}\n`
      }
      message.channel.send(sendingmessage)
      message.channel.send("select the number you want to delete")
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