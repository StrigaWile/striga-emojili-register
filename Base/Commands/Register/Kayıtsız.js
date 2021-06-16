const { MessageEmbed } = require('discord.js');
const settings = require('../../Config/Striga')
const db = require('quick.db')
const moment = require('moment')

module.exports = {
conf: {name: 'kayıtsız', aliases: ["unregister"], help: "Kayıt işlemi."},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.KayıtYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir kullanıcı belirtmeniz gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
const sebep = args.splice(1).join(" ");
if(!sebep) return message.channel.send(nembed.setDescription(`İşlem geçersiz, lütfen bir sebep belirtin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`İşlem geçersiz, kendinize bu işlemi yapamazsınız.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`İşlem geçersiz, senden üst/aynı pozisyonda birisine bunu yapamazsın.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

member.setNickname(member.user.username)
member.roles.set([SRol.KayıtsızRolü])

message.channel.send(embed.setDescription(`${member} üyesi ${message.author} tarafından kayıtsıza atıldı. ${SEmoji.Onayla}`)).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla))

}}