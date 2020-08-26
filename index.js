
const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});


const Discord = require('discord.js');
const client = new Discord.Client();
const cmd = require("node-cmd");
const ms = require("ms");
const fs = require('fs');
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');
/////////////
var meesage;
const prefix = "!" // هنا تحط البرافيكس
const admin = prefix
const developers = ["677617214668537877", "", ""]
///////////////
client.on('ready', () => {
  console.log(`Logged in as : ${client.user.tag}!`);
  console.log(`Servers : [ " ${client.guilds.size} " ]`);
  console.log(`Users : [ " ${client.users.size} " ]`);
  console.log(`Channels : [ " ${client.channels.size} " ]`);
  client.user.setStatus("Online")
});

client.on('message', message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
    if (!message.channel.guild) return message.reply('** This command only for servers**');

    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
    let user = message.mentions.users.first();
    let reason = message.content.split(" ").slice(2).join(" ");
    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if (!reason) return message.reply("**اكتب سبب الطرد**");
    if (!message.guild.member(user)
      .kickable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");

    message.guild.member(user).kick();

    const kickembed = new Discord.RichEmbed()
      .setAuthor(`KICKED!`, user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**User:**", '**[ ' + `${user.tag}` + ' ]**')
      .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
      .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
    message.channel.send({
      embed: kickembed
    })
  }
});






client.on('message', message => {
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
    if (!message.channel.guild) return message.reply('** This command only for servers**');

    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**انت لا تملك الصلاحيات المطلوبه**");
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
    let user = message.mentions.users.first();

    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if (!message.guild.member(user)
      .bannable) return message.reply("**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**");


    message.guild.member(user).ban(7, user);

    message.channel.send(`**:white_check_mark: ${user.tag} banned from the server ! :airplane: **  `)

  }
});






client.on('message', message => {
  if (message.content === prefix + "lock") {
    if (!message.channel.guild) return message.reply('** This command only for servers**');

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **__ليس لديك صلاحيات__**');
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false

    }).then(() => {
      message.reply("**__تم تقفيل الشات__ :white_check_mark: **")
    });
  }
  //FIRE BOT
  if (message.content === prefix + "unlock") {
    if (!message.channel.guild) return message.reply('** This command only for servers**');

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**__ليس لديك صلاحيات__**');
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: true

    }).then(() => {
      message.reply("**__تم فتح الشات__:white_check_mark:**")
    });
  }

});











client.on('message', message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + 'move')) {
    if (message.member.hasPermission("MOVE_MEMBERS")) {
      if (message.mentions.users.size === 0) {
        return message.channel.send("``لاستخدام الأمر اكتب هذه الأمر : " + prefix + "اسحب [USER]``")
      }
      if (message.member.voiceChannel != null) {
        if (message.mentions.members.first().voiceChannel != null) {
          var authorchannel = message.member.voiceChannelID;
          var usermentioned = message.mentions.members.first().id;
          var embed = new Discord.RichEmbed()
            .setTitle("Succes!")
            .setColor("#000000")
            .setDescription(`لقد قمت بسحب <@${usermentioned}> الى الروم الصوتي الخاص بك? `)
          var embed = new Discord.RichEmbed()
            .setTitle(`You are Moved in ${message.guild.name}`)
            .setColor("RANDOM")
            .setDescription(`**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`)
          message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed))
          message.guild.members.get(usermentioned).send(embed)
        } else {
          message.channel.send("``لا تستطيع سحب " + message.mentions.members.first() + " `يجب ان يكون هذه العضو في روم صوتي`")
        }
      } else {
        message.channel.send("**``يجب ان تكون في روم صوتي لكي تقوم بسحب العضو أليك``**")
      }
    } else {
      message.react("?")
    }
  }
});







client.on('message', message => {
  if (message.author.boss) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  if (command == "role") {
    if (!message.channel.guild) return;
    if (!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.reply("**:no_entry_sign:انت لا تملك صلاحيات **").then(msg => msg.delete(5000));;
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("البوت لايملك صلاحيات ").then(msg => msg.delete(5000));;
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.reply('**ضع منشن الشخص!!**').then(msg => { msg.delete(5000) });
    let MRole = message.content.split(" ").slice(2).join(" ");
    if (!MRole) return message.reply("يجب عليك وضع اسم الرتبة").then(msg => { msg.delete(5000) });
    message.guild.member(user).addRole(message.guild.roles.find("name", MRole));
    message.reply('** Done ? **').then(msg => { msg.delete(10000) });
  }
});

client.on('message', message => {
  if (message.author.boss) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  if (command == "roleremove") {
    if (!message.channel.guild) return;
    if (!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.reply("**:no_entry_sign:انت لا تملك صلاحيات **").then(msg => msg.delete(5000));;
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("البوت لايملك صلاحيات ").then(msg => msg.delete(5000));;
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.reply('**ضع منشن الشخص!!**').then(msg => { msg.delete(5000) });
    let MRole = message.content.split(" ").slice(2).join(" ");
    if (!MRole) return message.reply("يجب عليك وضع اسم الرتبة").then(msg => { msg.delete(5000) });
    message.guild.member(user).removeRole(message.guild.roles.find("name", MRole));
    message.reply('** Done ? **').then(msg => { msg.delete(10000) });
  }
});

client.on('message', message => {
  let args = message.content.split(' ').slice(1);
  if (message.content.startsWith(prefix + 'give')) {
    let member = message.mentions.users.first();
    let role = args.join(' ').replace(member, '').replace(args[0], '').replace(' ', '');
    console.log(role);
    if (member) {
      if (role.startsWith('-')) {
        let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
        console.log(roleRe);
        let role1 = message.guild.roles.find('name', roleRe);
        console.log(`hi`);
        if (!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
        message.guild.member(member).removeRole(role1.id);
      } else if (!role.startsWith('-')) {
        let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
        let role1 = message.guild.roles.find('name', roleRe);
        if (!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
        message.guild.member(member).addRole(role1);
      } else {
        message.reply(`يجب عليك كتابة اسم الرتبة`);
      }
    }
    else if (args[0] == 'all') {
      if (role) {
        let role1 = message.guild.roles.find('name', role);
        if (!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
        message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg => {
          message.guild.members.forEach(m => {
            message.guild.member(m).addRole(role1);
          });
          msg.edit(`تم الانتهاء من الامر ${message.guild.members.size}`);
        });
      }
    } else if (args[0] == 'humans') {
      if (role) {
        let role1 = message.guild.roles.find('name', role);
        if (!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
        message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg => {
          message.guild.members.filter(m => m.user.bot == false).forEach(m => {
            message.guild.member(m).addRole(role1);
          });
          msg.edit(`تم الانتهاء من الامر ${message.guild.members.size}`);
        });
      }
    } else if (args[0] == 'bots') {
      if (role) {
        let role1 = message.guild.roles.find('name', role);
        if (!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
        message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg => {
          message.guild.members.filter(m => m.user.bot == true).forEach(m => {
          });
          msg.edit(`تم الانتهاء من الامر ${message.guild.members.size}`);
        });
      }
    }
  }
});









//btrolie


//كود مسح الشات بعدد



client.on('message', message => {
  if (message.content.startsWith(prefix + 'cle')) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`ماعندك هذا البرمشن[*MANAGE_MESSAGES*] `).catch(console.error);
    message.delete()
    if (!message.channel.guild) return;
    let args = message.content.split(" ").slice(1);

    const messagecount = parseInt(args.join(' '));//btrolie

    message.channel.fetchMessages({

      limit: messagecount

    }).then(messages => message.channel.bulkDelete(messages));
    message.channel.sendMessage("", {
      embed: {
        title: "``✏️✅ تــم مسح الشات ``",
        color: 0x06DF00,
        footer: {

        }
      }
    }).then(msg => { msg.delete(3000) });
  };
  //btrolie
});


client.on("message", message => {
  let command = message.content.split(" ")[0];
  if (command == prefix + "unban") {
    if (!message.member.hasPermission("BAN_MEMBERS")) return;
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (args == "all") {
      message.guild.fetchBans().then(zg => {
        zg.forEach(Saad => {
          message.guild.unban(Saad);
        });
      });
      return message.channel.send("**✅ Unbanned all members **");
    }
    if (!args) return message.channel.send("**Please Type the member ID**");
    message.guild
      .unban(args)
      .then(m => {
        message.channel.send(
          `<a:x13:712913365508292610> **-** **Done Unbanned ${m.username}**`
        );
      })
      .catch(stry => {
        message.channel.send(
          `<a:x30:714394016883540031> **-** **I can't find \`${args}\` in the ban list**`
        );
      });
  }
});


///////////// Code  uprime  //////////////

client.on('message', message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "uptime")) {
    let uptime = client.uptime;

    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let notCompleted = true;

    while (notCompleted) {

      if (uptime >= 8.64e+7) {

        days++;
        uptime -= 8.64e+7;

      } else if (uptime >= 3.6e+6) {

        hours++;
        uptime -= 3.6e+6;

      } else if (uptime >= 60000) {

        minutes++;
        uptime -= 60000;

      } else if (uptime >= 1000) {
        seconds++;
        uptime -= 1000;

      }

      if (uptime < 1000) notCompleted = false;

    }

    message.channel.send("`" + `› [${days}] day  › [${hours}] hour  › [${minutes}] min › [${seconds}] sec` + "`");

  }
});

///// Code allbots//////
client.on('message', message => {
  if (!message.channel.guild) return;
  if (message.content == prefix + 'allbots') {
    if (message.author.bot) return;
    let i = 1;
    const botssize = message.guild.members.filter(m => m.user.bot).map(m => `${i++} - <@${m.id}>`);
    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`**<a:x1:712913421934395473> | Found ${message.guild.members.filter(m => m.user.bot).size} bots inServer**
${botssize.join('\n')}`)
      .setFooter(client.user.username, client.user.avatarURL)
      .setTimestamp();
    message.channel.send(embed)

  }


});






client.on("message", message => {
  if (message.content.startsWith(prefix + "setnick")) {
    if (
      message.author.bot ||
      message.channel.type == "dm" ||
      !message.member.hasPermission("MANAGE_NICKNAMES") ||
      !message.guild.member(client.user).hasPermission("MANAGE_NICKNAMES")
    )
      return;
    var user = message.mentions.members.first();
    var args = message.content.split(" ").slice(2);
    var nick = args.join(" ");
    if (!user || !args)
      return message.channel.send(
        `**<a:x30:714394016883540031> Write:** ${prefix}setnick \`\`@Name\`\` nickname`
      );
    if (
      message.guild.member(user.user).highestRole.position >=
      message.guild.member(client.user).highestRole.position
    )
      return message.channel.send(
        `<a:x30:714394016883540031> | I couldn't update that user. Please check my permissions and role position!`
      );
    message.guild
      .member(user.user)
      .setNickname(`${nick}`)
      .then(() => {
        message.channel.send(
          `<a:x13:712913365508292610> | Done changed **${user.user.username}** nickname to **${nick}**`
        );
      })
      .catch(console.error);
  }
});

client.on("message", message => {
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  if (command == "ct") {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply(
        "<a:x30:714394016883540031> **-** **You Don't Have `MANAGE_CHANNELS` Premissions**"
      );
    let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(" "), "text");
    message.channel.sendMessage(
      "<a:x13:712913365508292610> **-** **تــم انـشـاء روم كـتــابــي**"
    );
  }
});
client.on("message", message => {
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  if (command == "cv") {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply(
        "<a:x30:714394016883540031> **-** **You Don't Have `MANAGE_CHANNELS` Premissions**"
      );
    let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(" "), "voice");
    message.channel.sendMessage(
      "<a:x13:712913365508292610> **-** **تــم انـشـاء روم صـوتــي"
    );
  }
});







client.on('message', message => {
  if (message.content.startsWith(prefix + "user")) {
    const membre = message.mentions.members.first() || message.member;
    let embed1 = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setTitle(`${membre.user.username} :`)
      .setThumbnail(membre.user.avatarURL)
      .addField("`Joined Discord At :`", `__${moment.utc(membre.user.createdAt).format("LL")}__`, true)
      .addField("`Joined Server At :`", `__${moment.utc(membre.joinedAt).format('LL')}__`, true)
      .setFooter(membre.user.id, "https://images-ext-1.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif")

    message.channel.sendEmbed(embed1);
  }
});




client.on("message", message => {
  if (message.author.bot) return;
  let command = message.content.toLowerCase()
  if (command == prefix + "help") {
    let embed = new Discord.RichEmbed()
      .setDescription(` Projections
limitbans!
limitkicks!
limitroleDelete!
limitroleCreate!
limitchannelDelete!
limittime!
antibots off/on
antilink on/off  kick!
Adminstrative
ban!
lock!
unlock!
move!
role!
roleremove !
give all !
give humans!
give bots!
cle !
clear !
mute ! 
unmute!
unban!
uptime!
allbots!
setnick!
ct!
cv!
setLog!
autorole!
infoautorole!
General
permsbot!
user!
server!
roleinfo!
members!
report!
top!`)
    message.channel.send(embed);
  }
});

////////

let antibots = JSON.parse(fs.readFileSync('./antibots.json', 'utf8'));//require antihack.json file
client.on('message', message => {

  if (message.content.startsWith(prefix + "antibots on")) {
    if (!message.channel.guild) return;
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    antibots[message.guild.id] = {
      onoff: 'On',
    }
    message.channel.send(`**AntiBots Join Is On**`)
    fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    });
  }

})

client.on('message', message => {
  if (message.content.startsWith(prefix + "antibots off")) {
    if (!message.channel.guild) return;
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    antibots[message.guild.id] = {
      onoff: 'Off',
    }
    message.channel.send(`**AntiBots Join Is Off**`)
    fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    });
  }

})

client.on("guildMemberAdd", member => {
  if (!antibots[member.guild.id]) antibots[member.guild.id] = {
    onoff: 'Off'
  }
  if (antibots[member.guild.id].onoff === 'Off') return;
  if (member.user.bot) return member.kick()
})

fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
  if (err) console.error(err)
    .catch(err => {
      console.error(err);
    });

})







let spread = JSON.parse(fs.readFileSync('./spread.json', 'utf8'));
client.on('message', message => {
  if (message.content.startsWith(prefix + "antilink off")) {
    if (!message.channel.guild) return message.reply('**This Command Only For Servers**');
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`');
    spread[message.guild.id] = {
      onoff: 'Off',
    }
    message.channel.send(`**⛔ The AntiLink Is __𝐎𝐅𝐅__ !**`)
    fs.writeFile("./spread.json", JSON.stringify(spread), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    });
  }

})
client.on('message', message => {
  if (message.content.startsWith(prefix + "antilink on")) {
    if (!message.channel.guild) return message.reply('**This Command Only For Servers**');
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`');
    spread[message.guild.id] = {
      onoff: 'On',
    }
    message.channel.send(`**✅ The AntiLink Is __𝐎𝐍__ !**`)
    fs.writeFile("./spread.json", JSON.stringify(spread), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    });
  }

})
client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if (message.content.includes('http://www.gmail.com/')) {
    if (!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'
    }
    if (spread[message.guild.id].onoff === 'Off') return;
    message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if (message.content.includes('https://www.snapchat.com/')) {
    if (!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'

    }
    if (spread[message.guild.id].onoff === 'Off') return;
    message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }
});


client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if (message.content.includes('https://www.instagram.com/')) {
    if (!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'
    }
    if (spread[message.guild.id].onoff === 'Off') return;
    message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }
});


client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if (message.content.includes('https://www.twitter.com/')) {
    if (!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'
    }
    if (spread[message.guild.id].onoff === 'Off') return;
    message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }
});


client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if (message.content.includes('http://www.facebook.com/')) {
    if (!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'
    }
    if (spread[message.guild.id].onoff === 'Off') return;
    message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if (message.content.includes('https://www.discordapp.com/')) {
    if (!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'
    }
    if (spread[message.guild.id].onoff === 'Off') return;
    message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }

});
client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if (message.content.includes('https://discord.gg/')) {
    if (!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'
    }
    if (spread[message.guild.id].onoff === 'Off') return;
    message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }

});


//الحمايه



let anti = JSON.parse(fs.readFileSync("./antigreff.json", "UTF8"));//btrolie
let config = JSON.parse(fs.readFileSync("./config.json", "UTF8"));
client.on("message", message => {
  if (!message.channel.guild) return;
  let user = anti[message.guild.id + message.author.id]
  let num = message.content.split(" ").slice(1).join(" ");
  if (!anti[message.guild.id + message.author.id]) anti[message.guild.id + message.author.id] = {
    actions: 0
  }//btrolie
  if (!config[message.guild.id]) config[message.guild.id] = {
    banLimit: 3,
    chaDelLimit: 3,
    roleDelLimit: 3,//btrolie
    kickLimits: 3,
    roleCrLimits: 3,
    time: 30
  }
  if (message.content.startsWith(prefix + "limit")) {//btrolie


    if (!message.member.hasPermission('MANAGE_GUILD')) return;
    if (message.content.startsWith(prefix + "limitbans")) {
      if (!num) return message.channel.send("**→ | Supply a number !");
      if (isNaN(num)) return message.channel.send("**→ | Supply a number !**");//btrolie
      config[message.guild.id].banLimit = num;
      message.channel.send(`**→ | Changed bans limit to : ${config[message.guild.id].banLimit}.**`)//btrolie
    }
    if (message.content.startsWith(prefix + "limitkicks")) {
      if (!num) return message.channel.send("**→ | Supply a number !**");
      if (isNaN(num)) return message.channel.send("**→ | Supply a number !**");//btrolie 
      config[message.guild.id].kickLimits = num;
      message.channel.send(`**→ | Changed kicks limit to : ${config[message.guild.id].kickLimits}.**`)
    }
    if (message.content.startsWith(prefix + "limitroleDelete")) {
      if (!num) return message.channel.send("**→ | Supply a number !**");
      if (isNaN(num)) return message.channel.send("**→ | Supply a number !**");
      config[message.guild.id].roleDelLimit = num;
      message.channel.send(`**→ | Changed Role Deleting limit to : ${config[message.guild.id].roleDelLimit}.**`)
    }
    if (message.content.startsWith(prefix + "limitroleCreate")) {
      if (!num) return message.channel.send("**→ | Supply a number !**");//btrolie
      if (isNaN(num)) return message.channel.send("**→ | Supply a number !**");
      config[message.guild.id].roleCrLimits = num;
      message.channel.send(`**→ | Changed Role Creation limit to : ${config[message.guild.id].roleCrLimits}.**`)
    }//Zine , Mohamed Tarek , Kbosh
    if (message.content.startsWith(prefix + "limitchannelDelete")) {
      if (!num) return message.channel.send("**→ | Supply a number !**");
      if (isNaN(num)) return message.channel.send("**→ | Supply a number !**");
      config[message.guild.id].chaDelLimit = num;
      message.channel.send(`**→ | Changed Channel Deleting limit to : ${config[message.guild.id].chaDelLimit}.**`)
    }
    if (message.content.startsWith(prefix + "limittime")) {
      if (!num) return message.channel.send("**→ | Supply a number !**");
      if (isNaN(num)) return message.channel.send("**→ | Supply a number !**");
      config[message.guild.id].time = num;//btrolie//btrolie
      message.channel.send(`**→ | Changed Times limit to : ${config[message.guild.id].time}.**`)
    }
    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
      if (e) throw e;
    });//btrolie
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
      if (e) throw e;
    });
  }
});
client.on("channelDelete", async channel => {
  const entry1 = await channel.guild.fetchAuditLogs({
    type: 'CHANNEL_DELETE'
  }).then(audit => audit.entries.first())
  console.log(entry1.executor.username)
  const entry = entry1.executor//btrolie
  if (!config[channel.guild.id]) config[channel.guild.id] = {
    banLimit: 3,
    chaDelLimit: 3,
    roleDelLimit: 3,
    kickLimits: 3,
    roleCrLimits: 3//btrolie
  }
  if (!anti[channel.guild.id + entry.id]) {//btrolie
    anti[channel.guild.id + entry.id] = {
      actions: 1
    }
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0"
    }, config[channel.guild.id].time * 1000)
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)//btrolie
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0"
    }, config[channel.guild.id].time * 1000)//btrolie
    if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].chaDelLimit) {
      channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**→ | ${entry.username} , Deleted many __Channles__.**`))
      anti[channel.guild.id + entry.id].actions = "0"
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {//btrolie
        if (e) throw e;
      });//btrolie
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
        if (e) throw e;
      });
    }//btrolie
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});//btrolie

client.on("roleDelete", async channel => {
  const entry1 = await channel.guild.fetchAuditLogs({
    type: 'ROLE_DELETE'
  }).then(audit => audit.entries.first())
  console.log(entry1.executor.username)
  const entry = entry1.executor
  if (!config[channel.guild.id]) config[channel.guild.id] = {
    banLimit: 3,
    chaDelLimit: 3,//btrolie
    roleDelLimit: 3,
    kickLimits: 3,
    roleCrLimits: 3
  }
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    }
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0"
    }, config[channel.guild.id].time * 1000)
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
    console.log("TETS");
    setTimeout(() => {//btrolie
      anti[channel.guild.id + entry.id].actions = "0"
    }, config[channel.guild.id].time * 1000)
    if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleDelLimit) {
      channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**→ | ${entry.username} , Deleted many __Roles__!**`))
      anti[channel.guild.id + entry.id].actions = "0"
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
        if (e) throw e;
      });
    }
  }//btrolie

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("roleCreate", async channel => {
  const entry1 = await channel.guild.fetchAuditLogs({
    type: 'ROLE_CREATE'
  }).then(audit => audit.entries.first())
  console.log(entry1.executor.username)
  const entry = entry1.executor
  if (!config[channel.guild.id]) config[channel.guild.id] = {
    banLimit: 3,
    chaDelLimit: 3,
    roleDelLimit: 3,//btrolie
    kickLimits: 3,
    roleCrLimits: 3
  }
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    }
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0"
    }, config[channel.guild.id].time * 1000)
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
    console.log("TETS");//btrolie
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0"
    }, config[channel.guild.id].time * 1000)
    if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleCrLimits) {
      channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**→ | ${entry.username} , is creating many __Rooms__.**`))
      anti[channel.guild.id + entry.id].actions = "0"
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});
//







client.on('guildMemberUpdate', (alpha, kemzo, ) => {//!Gr » Kemzo ➹♔#4670
  if (alpha.roles.size < kemzo.roles.size) {//!Gr » Kemzo ➹♔#4670
    let role = kemzo.roles.filter(r => !alpha.roles.has(r.id)).first();//!Gr » Kemzo ➹♔#4670
    let embed = new Discord.RichEmbed()//!Gr » Kemzo ➹♔#4670
      .setThumbnail(alpha.guild.iconURL)//!Gr » Kemzo ➹♔#4670
      .setColor('RANDOM')//!Gr » Kemzo ➹♔#4670
      .setDescription(`
**New Role**
 
**✨ Role Name:** ( ${role.name} )
 
**🔗 Server:** ${kemzo.guild.name}`)//!Gr » Kemzo ➹♔#4670
      .setTimestamp()//!Gr » Kemzo ➹♔#4670
      .setFooter(`🔰 Guild ID : ${alpha.guild.id}`) //!Gr » Kemzo ➹♔#4670
    kemzo.user.send(embed); //!Gr » Kemzo ➹♔#4670
  }//!Gr » Kemzo ➹♔#4670
});//!Gr » Kemzo ➹♔#4670
//alpha website: http://alpha-codes.rf.gd/
//alpha server: https://discord.gg/rPhRxfd
//code by: !Gr » Kemzo ➹♔#4670

client.on('guildMemberAdd', member => {
  var embed = new Discord.RichEmbed()
    .setThumbnail(member.user.avatarURL)
    .addField("***شكرا الانضمامك الينا***", member.user.username)
    .setDescription('***اطلق من نورنا السيرفر***')
    .setColor('RANDOM')
    .setImage('http://www.imgion.com/images/01/Welcome-buddy.jpg')
  var channel = member.guild.channels.find('name', 'welcome')
  if (!channel) return;
  channel.send({ embed: embed });
});
client.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  var prefix = "$";
  if (message.content == prefix + "newembed") {
    var embed = new Discord.RichEmbed()
      .setTitle(`Embed By: ${message.author.username}#${message.author.discriminator}`)
      .setColor('RANDOM')
      .setDescription('```' + `Your Messages Here.t` + '```')
    message.channel.send(embed)
  }
});

client.on('guildMemberRemove', member => {
  var embed = new Discord.RichEmbed()
    .setAuthor(member.user.username, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(`الله معاك ✋:skin-tone-1: 😔`)
    .setDescription(`مع السلامه تشرفنا بك ✋:skin-tone-1: 😔 `)
    .addField('👤   تبقي', `**[ ${member.guild.memberCount} ]**`, true)
    .setColor('RED')
    .setFooter(`==== نــتــمــنــآ لــكــم آســتــمـــتــآع ====`, 'https://cdn.discordapp.com/attachments/397818254439219217/399292026782351381/shy.png')

  var channel = member.guild.channels.find('name', 'exit')
  if (!channel) return;
  channel.send({ embed: embed });
})


let vipid = '730444879771205716'
const vipfile = JSON.parse(fs.readFileSync('./vip.json', 'utf8'));
client.on('message', message => {
  if (!message.author.id === vipid) return message.channel.send('This Command For The Person Purchased The Premium ❌')
  if (message.content.startsWith(prefix + 'vipmove')) {
    vipfile[message.guild.id] = {
      guild: message.guild.id,
    }
  }
})

client.on('guildCreate', msg => {
  if (!vipfile[msg.id]) return;
  if (!msg.id === vipfile[msg.id].guild) return client.guild.leave()
})


client.on('message', message => {
  if (message.content.startsWith(`$time`)) {

    let embed = new Discord.RichEmbed()
      .setDescription("امر الوقت")
      .addField("الوقت", message.createdAt)
    message.channel.send(embed)
  }
})//Shady Craft YT#4176
//Shady Craft YT#4



const rWlc = JSON.parse(fs.readFileSync("./AutoRole.json", "utf8"));
client.on('message', message => {
  var prefix = "!";//البرفكس
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!rWlc[message.guild.id]) rWlc[message.guild.id] = {
    role: "member"
  }
  const channel = rWlc[message.guild.id].role
  if (message.content.startsWith(prefix + "autorole")) {
    if (!message.member.hasPermission(`MANAGE_GUILD`)) return;
    let newrole = message.content.split(' ').slice(1).join(" ")
    if (!newrole) return message.reply(`**${prefix}autorole <role name>**`)
    rWlc[message.guild.id].role = newrole
    message.channel.send(`**${message.guild.name}'s role has been changed to ${newrole}**`);
  }
  fs.writeFile("./AutoRole.json", JSON.stringify(rWlc), function(e) {
    if (e) throw e;
  })
});
client.on("guildMemberAdd", member => {
  if (!rWlc[member.guild.id]) rWlc[member.guild.id] = {
    role: "member"
  }
  const sRole = rWlc[member.guild.id].role
  let Rrole = member.guild.roles.find('name', sRole);
  member.addRole(Rrole);

});

client.on("message", msg => {
  if (msg.content.startsWith(prefix + "infoautorole")) {
    var sRole = rWlc[msg.guild.id].role
    let emb = new Discord.RichEmbed()
      .setTitle("**AutoRole معلومات**")
      .setAuthor(msg.guild.name, msg.guild.iconURL)
      .setThumbnail(msg.guild.iconURL)
      .setColor("GREEN")
      .addField("**ايدي السيرفر**", msg.guild.id)
      .addField("**اسم السيرفر**", msg.guild.name)
      .addField("**الرتبه المحددة**", sRole)
      .setFooter(client.user.tag, client.user.avatarURL)
    msg.channel.send(emb)
  }
});


var top = require("./top.json");
function save() {
  fs.writeFileSync("./top.json", JSON.stringify(top, null, 4));
}
client.on("voiceStateUpdate", async function(oldMember, newMember) {
  if (newMember.user.bot) return;
  if (!top[newMember.guild.id]) top[newMember.guild.id] = {};
  if (!top[newMember.guild.id][newMember.user.id]) top[newMember.guild.id][newMember.user.id] = {
    "text": 0,
    "voice": parseInt(Math.random() * 10),
    "msgs": 0,
    "id": newMember.user.id
  }
  save();
  if (!oldMember.voiceChannel && newMember.voiceChannel) {
    var addXP = setInterval(async function() {
      top[newMember.guild.id][newMember.user.id].voice += parseInt(Math.random() * 4);
      save();
      if (!newMember.voiceChannel) {
        clearInterval(addXP);
      }
    }, 60000);
  }
});
client.on("message", async function(message) {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!top[message.guild.id]) top[message.guild.id] = {};
  if (!top[message.guild.id][message.author.id]) top[message.guild.id][message.author.id] = {
    "text": parseInt(Math.random() * 10),
    "voice": 1,
    "msgs": 0,
    "id": message.author.id
  }
  if (top[message.guild.id][message.author.id].msgs > 10) {
    top[message.guild.id][message.author.id].text += parseInt(Math.random() * 4);
    top[message.guild.id][message.author.id].msgs = 0;
  }
  save();
  var args = message.content.split(" ");
  var cmd = args[0].toLowerCase();
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "top text")) {
    var topArray = Object.values(top[message.guild.id]);
    var num = 0;
    var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 5).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function(user) {
      if (user.text > 0) {
        return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`
      }
    }).join("\n")}`;
    var embed = new Discord.RichEmbed()
      .setAuthor("📋 لائحة متصدرين نقاط السيرفر", message.guild.iconURL)
      .setColor("13B813")
      .addField(`**:speech_balloon: | نقاط الكتابة**`, `${textStr}   \n\n\n ** :sparkles: | ؟المزيد: \`${prefix}top text\`**`, true)
      .setFooter(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
    message.channel.send({
      embed: embed
    });
    //   if (!message.content.startsWith(prefix)) return;
  } else {
    if (message.content.startsWith(prefix + "top voice")) {
      var topArray = Object.values(top[message.guild.id]);
      var num = 0;
      var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 5).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function(user) {
        if (user.voice > 0) {
          return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`
        }
      }).join("\n")}`;
      var embed = new Discord.RichEmbed()
        .setAuthor("📋 لائحة متصدرين نقاط السيرفر", message.guild.iconURL)
        .setColor("13B813")
        .addField(`**:microphone2: | نقاط الصوت**`, `${voiceStr}   \n\n\n **:sparkles: المزيد?** \`${prefix}top voice\``, true)

        .setFooter(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
      message.channel.send({
        embed: embed
      });

    } else {
      if (message.content.startsWith(prefix + "reset voice")) {
        var reset = ':white_check_mark:  ?? ????? ?????? ?????'
        var confirm = ' ??? ????? ??? ???? ????? ???? ???? ??????'

        message.channel.send(`**${confirm}**`).then(async msg => {
          await msg.react("?")
          await msg.react("?")
          const doma = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "?" && user.id === message.author.id, { time: 60000 })
          const ziad = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "?" && user.id === message.author.id, { time: 60000 })
          doma.on("collect", async r => {



            msg.delete()

            msg.channel.send(`${reset}`)

          })

          ziad.on("collect", async r => {

            msg.delete()
          })

        })

        //  break;
        // if (!message.content.startsWith(prefix)) return;
      } else {
        if (message.content.startsWith(prefix + "top")) {
          var topArray = Object.values(top[message.guild.id]);
          var num = 0;
          var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 10).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function(user) {
            if (user.text > 0) {
              return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`
            }
          }).join("\n")}`;
          num = 0;
          var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 10).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function(user) {
            if (user.voice > 0) {
              return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`
            }
          }).join("\n")}`;
          var embed = new Discord.RichEmbed()
            .setAuthor("📋 لائحة متصدرين نقاط السيرفر", message.guild.iconURL)
            .addField("**أعلى ٥ كتابياً :speech_balloon:**", `${textStr}  \n\n  **:sparkles: المزيد?** \`${prefix}top text\``, true)
            .addField("**أعلى ٥ صوتياً :microphone2:**", `${voiceStr} \n\n **:sparkles: المزيد?** \`${prefix}top voice\``, true)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setColor("13B813");
          message.channel.send({
            embed: embed


          });



        }
      }
    }
  }
});


















client.on('message', message => {
  if (message.content.startsWith("!botinfo")) {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setThumbnail(client.user.avatarURL)
        .setColor('RANDOM')
        .setTitle('``INFO  ?????????? ??????`` ')
        .addField('``My Ping``', [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
        .addField('``servers``', [client.guilds.size], true)
        .addField('``channels``', `[ ${client.channels.size} ]`, true)
        .addField('``Users``', `[ ${client.users.size} ]`, true)
        .addField('``My Name``', `[ ${client.user.tag} ]`, true)
        .addField('``My ID``', `[ ${client.user.id} ]`, true)
        .addField('``My Prefix``', `[ + ]`, true)
        .addField('``My Language``', `[ JavaScript ]`, true)
        .addField('``Bot Version``', `[ v0.1 ]`, true)
        .setFooter('By | <@677617214668537877>')
    })
  }
});

client.on("message", message => {//Shady Craft YT#
  var prefix = "-";//Shady Craft YT#
  if (message.content.startsWith(prefix + "permsbot")) {
    if (!message.channel.guild) return;
    var perms = JSON.stringify(
      message.channel.permissionsFor(client.user).serialize(),
      null,
      4
    );//Shady Craft YT#
    var shadycraftYT = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle(":tools: Permissions")
      .addField("My Permissions:", perms);
    message.channel.send({ embed: shadycraftYT });
  }//Shady Craft YT#
});//Shady Craft YT#









var AsciiTable = require('ascii-data-table').default
client.on('message', message => {

  if (message.content.startsWith(prefix + "roles")) {
    ros = message.guild.roles.size,
      data = [['Rank', 'RoleName']]
    for (let i = 0; i < ros; i++) {
      if (message.guild.roles.array()[i].id !== message.guild.id) {
        data.push([i, `${message.guild.roles.filter(r => r.position == ros - i).map(r => r.name)}`])
      }
    }
    let res = AsciiTable.table(data)

    message.channel.send(`**\`\`\`xl\n${res}\`\`\`**`);
  }
});







client.on('message', message => {
  if (message.content === "!server") {
    if (!message.channel.guild) return
    var verificationLevel = message.guild.verificationLevel;
    const verificationLevels = ['None', 'Low', 'Meduim', 'High', 'Extreme'];
    var Y1 = message.guild.createdAt.getFullYear() - 2000
    var M2 = message.guild.createdAt.getMonth()
    var D3 = message.guild.createdAt.getDate()
    const xNiTRoZ = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor('RANDOM')
      .setTimestamp()
      .setTitle(message.guild.name, message.guild.iconURL)
      .addField(':id: اي دي السيرفر', `${message.guild.id}`, true)
      .addField(':date: أنشئت في', D3 + '.' + M2 + '.' + Y1, true)
      .addField(':crown: اونر السيرفر', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
      .addField(':busts_in_silhouette: الاعضاء ' + ` ${message.guild.memberCount} `, 'Online ' + `[ ${message.guild.members.filter(m => m.presence.status == 'online', 'idle', 'dnd').size} ]` + ',' + 'Offline ' + `[ ${message.guild.members.filter(m => m.presence.status == 'offline').size} ]`, true)
      .addField(':speech_balloon: قنوات' + ' ' + message.guild.channels.size + ' ', `Text [ ${message.guild.channels.filter(m => m.type === 'text').size} ]` + ', ' + `Voice [ ${message.guild.channels.filter(m => m.type === 'voice').size} ]`, true)
      .addField(':earth_asia: الدوله', message.guild.region)
      .addField(':ribbon: ايموجي السيرفر', `${message.guild.emojis.size}`, true)
      .addField(':construction: مستوى التحقق', `${verificationLevels[message.guild.verificationLevel]}`, true)
      .addField(':closed_lock_with_key: الرتب  ' + message.guild.roles.size + ' ', 'Type`*roles` To See The Server Roles!')
    message.channel.send({ embed: xNiTRoZ });
  }
});


client.on('message', message => {

  if (message.content.startsWith(prefix + "roleinfo")) {
    let args = message.content.split(" ").slice(1).join(" ");
    let role = message.guild.roles.find(r => r.name === `${args}`);
    if (!args) return message.reply('اكتب اسم الرتبة');
    if (!role) return message.reply('هذه الرتبة غير موجودة');

    let RI = new Discord.RichEmbed()
      .setTitle(message.guild.name)
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setThumbnail(message.guild.iconURL)
      .addField('- اسم الرتبة', role.name, true)
      .addField('- اي دي الرتبة', role.id, true)
      .addField('- لون الرتبة', role.hexColor, true)
      .addField('- خصائص الرتبة', role.permissions, true)
      .addField('- عدد الاعضاء الذي لديهم نفس الرتبة', role.members.size, true)
      .addField('- مركز الرتبة بين كل الرتب', role.position - message.guild.roles.size, true)
      .setFooter(message.author.tag, message.author.avatarURL);

    message.channel.send(RI);
  }
});

client.on('message', message => {
  if (message.content.startsWith('!members')) {
    let pages = [`**Members info 
:green_heart: online:   ${message.guild.members.filter(m => m.presence.status == 'online').size}
:heart:  dnd:       ${message.guild.members.filter(m => m.presence.status == 'dnd').size}
:yellow_heart:  idle:     ${message.guild.members.filter(m => m.presence.status == 'idle').size}
:diamond_shape_with_a_dot_inside:   membersCount:  ${message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size}
:bulb: bots: ${message.guild.members.filter(m => m.user.bot).size} **
`, ` **معلومات عن اعضاء
:green_heart: المتواجدين :   ${message.guild.members.filter(m => m.presence.status == 'online').size}
:heart:  الخاملين :       ${message.guild.members.filter(m => m.presence.status == 'dnd').size}
:yellow_heart:  مشغولين :     ${message.guild.members.filter(m => m.presence.status == 'idle').size}
:diamond_shape_with_a_dot_inside:   عدد اعضاء :  ${message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size}
:bulb: عدد البوتات : ${message.guild.members.filter(m => m.user.bot).size} ** `]
    let page = 1;

    let alpha = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor(client.user.username, client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .setFooter(`Page ${page} of ${pages.length}`)
      .setDescription(pages[page - 1])

    message.author.sendEmbed(alpha).then(msg => {

      msg.react('◀').then(r => {
        msg.react('▶')


        const backwordsFilters = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
        const forwordsFilters = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;


        const backwords = msg.createReactionCollector(backwardsFilter, { time: 20000000 });
        const forwords = msg.createReactionCollector(forwardsFilter, { time: 20000000 });



        backwords.on('collect', r => {
          if (page === 1) return;
          page--;
          alpha.setDescription(pages[page - 1]);
          alpha.setFooter(`Page ${page} of ${pages.length}`);
          msg.edit(alpha)
        })
        forwords.on('collect', r => {
          if (page === pages.length) return;
          page++;
          alpha.setDescription(pages[page - 1]);
          alpha.setFooter(`Page ${page} of ${pages.length}`);
          msg.edit(alpha)
        })
      })
    })
  }
});



client.on('message', function(message) {
  if (message.content.startsWith(prefix + "report")) {
    let messageArgs = message.content.split(" ").slice(1).join(" ");
    let messageReason = message.content.split(" ").slice(2).join(" ");
    if (!messageReason) return message.reply("** Specify a reason!**");
    let mUser = message.mentions.users.first();
    if (!mUser) return message.channel.send("Couldn't find user.");
    let Rembed = new Discord.RichEmbed()
      .setTitle("`New Report!`")
      .setThumbnail(message.author.avatarURL)
      .addField("**# - Reported User:**", mUser, true)
      .addField("**# - Reported User ID:**", mUser.id, true)
      .addField("**# - Reason:**", messageReason, true)
      .addField("**# - Channel:**", message.channel, true)
      .addField("**# - Time:**", message.createdAt, true)
      .setFooter("لو ان الابلاغ فيه مزح راح يتعرض صاحب الابلاغ لقوبات")
    message.channel.send(Rembed)
    message.channel.send("__Are you sure you want to send this to the Server owner??__").then(msg => {
      msg.react("✅")
      msg.react("❌")
        .then(() => msg.react('❌'))
        .then(() => msg.react('✅'))
      let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
      let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

      let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
      let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
      reaction1.on("collect", r => {
        message.guild.owner.send(Rembed)
        message.reply("**# - Done! 🎇**");
      })
      reaction2.on("collect", r => {
        message.reply("**# - Canceled!**");
      })
    })
  }
});



//كود فك الميوت
client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "unmute") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .reply("** لا يوجد لديك برمشن 'Manage Roles' **")
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.find(gg => gg.name === "log");
    let muteRole = client.guilds
      .get(message.guild.id)
      .roles.find(gg => gg.name === "ميوت");
    if (!muteRole)
      return message
        .reply("** لا يوجد لديك رتبه الميوت 'ميوت' **")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .reply("** يجب عليك منشنت شخص اولاً**")
        .catch(console.error);
    const embed = new Discord.RichEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("الأستعمال:", "اسكت/احكي")
      .addField(
        "تم فك الميوت عن:",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "بواسطة:",
        `${message.author.username}#${message.author.discriminator}`
      );

    if (
      !message.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return message
        .reply("** لا يوجد لدي برمشن Manage Roles **")
        .catch(console.error);

    if (message.guild.member(user).removeRole(muteRole.id)) {
      return message
        .reply("**:white_check_mark: .. تم فك الميوت عن الشخص **")
        .catch(console.error);
    } else {
      message.guild
        .member(user)
        .removeRole(muteRole)
        .then(() => {
          return message
            .reply("**:white_check_mark: .. تم فك الميوت عن الشخص **")
            .catch(console.error);
        });
    }
  }
});

////كود ميوت او اسكات
client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "mute") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .reply("** لا يوجد لديك برمشن 'Manage Roles' **")
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.find(gg => gg.name === "log");
    let muteRole = client.guilds
      .get(message.guild.id)
      .roles.find(gg => gg.name === "ميوت");
    if (!muteRole)
      return message
        .reply("** لا يوجد رتبة الميوت 'ميوت' **")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .reply("** يجب عليك منشنت شخص اولاً**")
        .catch(console.error);

    const embed = new Discord.RichEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("الأستعمال:", "اسكت/احكي")
      .addField(
        "تم ميوت:",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "بواسطة:",
        `${message.author.username}#${message.author.discriminator}`
      );

    if (
      !message.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return message
        .reply("** لا يوجد لدي برمشن Manage Roles **")
        .catch(console.error);

    if (message.guild.member(user).roles.has(muteRole.id)) {
      return message
        .reply("**:white_check_mark: .. تم اعطاء العضو ميوت**")
        .catch(console.error);
    } else {
      message.guild
        .member(user)
        .addRole(muteRole)
        .then(() => {
          return message
            .reply("**:white_check_mark: .. تم اعطاء العضو ميوت كتابي**")
            .catch(console.error);
        });
    }
  }
});










client.on("ready", () => {
  console.log("Ready Now!");
  client.user.setActivity(`${prefix}help +inv| ${client.guilds.size}`);
  client.user.setStatus("idle");
});










const log = JSON.parse(fs.readFileSync("./log.json", "utf8"));

client.on("message", message => {
  if (!message.channel.guild) return;

  let room = message.content.split(" ").slice(1);
  let findroom = message.guild.channels.find("name", `${room}`);
  if (message.content.startsWith(prefix + "setLog")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!room) return message.channel.send("Please Type The Channel Name");
    if (!findroom)
      return message.channel.send("Please Type The Log Channel Name");
    let embed = new Discord.RichEmbed()
      .setTitle("**Done The Log Code Has Been Setup**")
      .addField("Channel:", `${room}`)
      .addField("Requested By:", `${message.author}`)
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${client.user.username}`);
    message.channel.sendEmbed(embed);
    log[message.guild.id] = {
      channel: room,
      onoff: "On"
    };
    fs.writeFile("./log.json", JSON.stringify(log), err => {
      if (err) console.error(err);
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "toggleLog")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!log[message.guild.id])
      log[message.guild.id] = {
        onoff: "Off"
      };
    if (log[message.guild.id].onoff === "Off")
      return [
        message.channel.send(`**The log Is __𝐎𝐍__ !**`),
        (log[message.guild.id].onoff = "On")
      ];
    if (log[message.guild.id].onoff === "On")
      return [
        message.channel.send(`**The log Is __𝐎𝐅𝐅__ !**`),
        (log[message.guild.id].onoff = "Off")
      ];
    fs.writeFile("./log.json", JSON.stringify(log), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});

client.on("messageDelete", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;
  if (!log[message.guild.id])
    log[message.guild.id] = {
      onoff: "Off"
    };
  if (log[message.guild.id].onoff === "Off") return;
  var logChannel = message.guild.channels.find(
    c => c.name === `${log[message.guild.id].channel}`
  );
  if (!logChannel) return;

  let messageDelete = new Discord.RichEmbed()
    .setTitle("**[MESSAGE DELETE]**")
    .setColor("RED")
    .setThumbnail(message.author.avatarURL)
    .setDescription(
      `**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``
    )
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL);

  logChannel.send(messageDelete);
});
client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (!oldMessage.channel.type === "dm") return;
  if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS"))
    return;
  if (!oldMessage.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;
  if (!log[oldMessage.guild.id])
    log[oldMessage.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMessage.guild.id].onoff === "Off") return;
  var logChannel = oldMessage.guild.channels.find(
    c => c.name === `${log[oldMessage.guild.id].channel}`
  );
  if (!logChannel) return;

  if (oldMessage.content.startsWith("https://")) return;

  let messageUpdate = new Discord.RichEmbed()
    .setTitle("**[MESSAGE EDIT]**")
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor("BLUE")
    .setDescription(
      `**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``
    )
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL);

  logChannel.send(messageUpdate);
});

client.on("roleCreate", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleCreate = new Discord.RichEmbed()
      .setTitle("**[ROLE CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleCreate);
  });
});
client.on("roleDelete", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleDelete = new Discord.RichEmbed()
      .setTitle("**[ROLE DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleDelete);
  });
});
client.on("roleUpdate", (oldRole, newRole) => {
  if (!oldRole.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!oldRole.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[oldRole.guild.id])
    log[oldRole.guild.id] = {
      onoff: "Off"
    };
  if (log[oldRole.guild.id].onoff === "Off") return;
  var logChannel = oldRole.guild.channels.find(
    c => c.name === `${log[oldRole.guild.id].channel}`
  );
  if (!logChannel) return;

  oldRole.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldRole.name !== newRole.name) {
      if (log[oldRole.guild.id].onoff === "Off") return;
      let roleUpdateName = new Discord.RichEmbed()
        .setTitle("**[ROLE NAME UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateName);
    }
    if (oldRole.hexColor !== newRole.hexColor) {
      if (oldRole.hexColor === "#000000") {
        var oldColor = "`Default`";
      } else {
        var oldColor = oldRole.hexColor;
      }
      if (newRole.hexColor === "#000000") {
        var newColor = "`Default`";
      } else {
        var newColor = newRole.hexColor;
      }
      if (log[oldRole.guild.id].onoff === "Off") return;
      let roleUpdateColor = new Discord.RichEmbed()
        .setTitle("**[ROLE COLOR UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateColor);
    }
  });
});

client.on("channelCreate", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelCreate = new Discord.RichEmbed()
      .setTitle("**[CHANNEL CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelCreate);
  });
});
client.on("channelDelete", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelDelete = new Discord.RichEmbed()
      .setTitle("**[CHANNEL DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelDelete);
  });
});
client.on("channelUpdate", (oldChannel, newChannel) => {
  if (!oldChannel.guild) return;
  if (!log[oldChannel.guild.id])
    log[oldChannel.guild.id] = {
      onoff: "Off"
    };
  if (log[oldChannel.guild.id].onoff === "Off") return;
  var logChannel = oldChannel.guild.channels.find(
    c => c.name === `${log[oldChannel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (oldChannel.type === "text") {
    var channelType = "Text";
  } else if (oldChannel.type === "voice") {
    var channelType = "Voice";
  } else if (oldChannel.type === "category") {
    var channelType = "Category";
  }

  oldChannel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldChannel.name !== newChannel.name) {
      let newName = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newName);
    }
    if (oldChannel.topic !== newChannel.topic) {
      if (log[oldChannel.guild.id].onoff === "Off") return;
      let newTopic = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic ||
          "NULL"}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic ||
          "NULL"}\`\`\`\n**Channel:** ${oldChannel} (ID: ${
          oldChannel.id
          })\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newTopic);
    }
  });
});

client.on("guildBanRemove", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[guild.guild.id])
    log[guild.guild.id] = {
      onoff: "Off"
    };
  if (log[guild.guild.id].onoff === "Off") return;
  var logChannel = guild.channels.find(
    c => c.name === `${log[guild.guild.id].channel}`
  );
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (userID === client.user.id) return;

    let unBanInfo = new Discord.RichEmbed()
      .setTitle("**[UNBANNED]**")
      .setThumbnail(userAvatar)
      .setColor("GREEN")
      .setDescription(
        `**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(unBanInfo);
  });
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (!oldMember.guild) return;
  if (!log[oldMember.guild.id])
    log[oldMember.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMember.guild.id].onoff === "Off") return;
  var logChannel = oldMember.guild.channels.find(
    c => c.name === `${log[(oldMember, newMember.guild.id)].channel}`
  );
  if (!logChannel) return;

  oldMember.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;
    var userTag = logs.entries.first().executor.tag;

    if (oldMember.nickname !== newMember.nickname) {
      if (oldMember.nickname === null) {
        var oldNM = "`اسمه الاصلي`";
      } else {
        var oldNM = oldMember.nickname;
      }
      if (newMember.nickname === null) {
        var newNM = "`اسمه الاصلي`";
      } else {
        var newNM = newMember.nickname;
      }

      let updateNickname = new Discord.RichEmbed()
        .setTitle("**[UPDATE MEMBER NICKNAME]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

      logChannel.send(updateNickname);
    }
    if (oldMember.roles.size < newMember.roles.size) {
      let role = newMember.roles
        .filter(r => !oldMember.roles.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[oldMember.guild.id].onoff === "Off") return;
      let roleAdded = new Discord.RichEmbed()
        .setTitle("**[ADDED ROLE TO MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("GREEN")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleAdded);
    }
    if (oldMember.roles.size > newMember.roles.size) {
      let role = oldMember.roles
        .filter(r => !newMember.roles.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
      let roleRemoved = new Discord.RichEmbed()
        .setTitle("**[REMOVED ROLE FROM MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("RED")
        .setDescription(
          `**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleRemoved);
    }
  });
  if (oldMember.guild.owner.id !== newMember.guild.owner.id) {
    if (!log[oldMember.guild.id])
      log[oldMember.guild.id] = {
        onoff: "Off"
      };
    if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
    let newOwner = new Discord.RichEmbed()
      .setTitle("**[UPDATE GUILD OWNER]**")
      .setThumbnail(oldMember.guild.iconURL)
      .setColor("GREEN")
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`
      )
      .setTimestamp()
      .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

    logChannel.send(newOwner);
  }
});

client.on("voiceStateUpdate", (voiceOld, voiceNew) => {
  if (!voiceOld.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!voiceOld.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[voiceOld.guild.id])
    log[voiceOld.guild.id] = {
      onoff: "Off"
    };
  if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
  var logChannel = voiceOld.guild.channels.find(
    c => c.name === `${log[(voiceOld, voiceNew.guild.id)].channel}`
  );
  if (!logChannel) return;

  voiceOld.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userTag = logs.entries.first().executor.tag;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (voiceOld.serverMute === false && voiceNew.serverMute === true) {
      let serverMutev = new Discord.RichEmbed()
        .setTitle("**[VOICE MUTE]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverMutev);
    }
    if (voiceOld.serverMute === true && voiceNew.serverMute === false) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverUnmutev = new Discord.RichEmbed()
        .setTitle("**[VOICE UNMUTE]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUnmutev);
    }
    if (voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverDeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE DEAF]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverDeafv);
    }
    if (voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverUndeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE UNDEAF]**")
        .setThumbnail(
          "https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUndeafv);
    }
  });

  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    voiceNew.voiceChannel &&
    voiceOld.voiceChannel != null
  ) {
    if (!log[voiceOld.guild.id])
      log[voiceOld.guild.id] = {
        onoff: "Off"
      };
    if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
    let voiceLeave = new Discord.RichEmbed()
      .setTitle("**[CHANGED VOICE ROOM]**")
      .setColor("GREEN")
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(
        `**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceLeave);
  }
});





client.login(process.env.TOKEN);
