const { MessageEmbed } = require('discord.js');
const settings = require('../../Config/Striga')
const db = require('quick.db')
const moment = require('moment')

module.exports = {
conf: {name: 'kayıt', aliases: ["erkek", "e", "adam", "kadın", "kız", "k"], help: "Kayıt işlemi."},
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

var strigaMesaj = await message.channel.send(embed.setDescription(`${member} üyesinin ismi "${sunucuismi}" olarak güncellendi.\nEmojiye basarak cinsiyet seçimi yapabilirsiniz.`))
let emojiYiyici = strigaMesaj.createReactionCollector((reaction, user) => user.id === message.author.id);
await strigaMesaj.react(SEmoji.erkekGif)
await strigaMesaj.react(SEmoji.kadinGif)

emojiYiyici.on("collect", async(reaction, user) => {
await strigaMesaj.reactions.removeAll()    
if (reaction.emoji.id == SEmoji.erkekGifID) { 
let pushT = {Kullanici: member.id, Yetkili: message.author.id, İsimleri: sunucuismi, Rol: `<@&${SRol.ErkekRol_1}>`, Tarih: Date.now()}    
db.push(`uye.${member.id}.isimleri`, pushT)    
db.add(`yetkili.${message.author.id}.teyit`, 1)    
db.add(`yetkili.${message.author.id}.erkek`, 1)  
strigaMesaj.edit(embed.setDescription(`${member} üyesinin ismi "${sunucuismi}" ismi olarak ayarlandı ve **Erkek** rolleri verildi.`).setColor('#40eec8')).then(message.react(SEmoji.Onayla))
member.setNickname(`${sunucuismi}`)
member.roles.remove(SRol.KayıtsızRolü)
await member.roles.add(SRol.ErkekRol_1)
await member.roles.add(SRol.ErkekRol_2)
}
if (reaction.emoji.id == SEmoji.kadinGifID) { 
let pushT = {Kullanici: member.id, Yetkili: message.author.id, İsimleri: sunucuismi, Rol: `<@&${SRol.KadınRol_1}>`, Tarih: Date.now()}    
db.push(`uye.${member.id}.isimleri`, pushT)    
db.add(`yetkili.${message.author.id}.teyit`, 1)    
db.add(`yetkili.${message.author.id}.kadin`, 1)  
strigaMesaj.edit(embed.setDescription(`${member} üyesinin ismi "${sunucuismi}" ismi olarak ayarlandı ve **Kadın** rolleri verildi.`).setColor('#b040ee')).then(message.react(SEmoji.Onayla))
member.setNickname(`${sunucuismi}`)
member.roles.remove(SRol.KayıtsızRolü)
await member.roles.add(SRol.KadınRol_1)
await member.roles.add(SRol.KadınRol_1)}})
}}