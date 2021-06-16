const { MessageEmbed } = require('discord.js');
const settings = require('../../Config/Striga')
const db = require('quick.db')
const moment = require('moment')

module.exports = {
conf: {name: 'isim', aliases: ["isim-değiştir"], help: "Kayıt işlemi."},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.KayıtYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir kullanıcı belirtmeniz gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(!args[1]) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir isim belirtin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(!args[2]) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir yaş belirtin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
let isim = args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase(); let yaş = Number(args[2])
if(!Number(args[2])) return message.channel.send(nembed.setDescription(`İşlem geçersiz, lütfen yaşı sayı ile belirtin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`İşlem geçersiz, kendinize bu işlemi yapamazsınız.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`İşlem geçersiz, senden üst/aynı pozisyonda birisine bunu yapamazsın.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

const sunucuismi = `${member.user.username.includes(settings.sunucuTag) ? settings.sunucuTag : settings.tagsızTag} ${isim} | ${yaş}`
await member.setNickname(`${sunucuismi}`)

let pushT = {Kullanici: member.id, Yetkili: message.author.id, İsimleri: sunucuismi, Rol: `İsim Değişikliği`, Tarih: Date.now()}    
db.push(`uye.${member.id}.isimleri`, pushT)    

message.channel.send(embed.setDescription(`${member} üyesinin ismi "${sunucuismi}" olarak güncellendi.`)).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla))

}}