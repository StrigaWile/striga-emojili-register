const { MessageEmbed } = require('discord.js');
const settings = require('../../Config/Striga')
const db = require('quick.db')
const moment = require('moment')

module.exports = {
conf: {name: 'kayıtlar', aliases: ["kayıtlarım"], help: "Kayıt işlemi."},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.KayıtYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) {
let toplamteyit = db.get(`yetkili.${message.author.id}.teyit`) || "0"    
let erkekteyit = db.get(`yetkili.${message.author.id}.erkek`) || "0"     
let kadınteyit = db.get(`yetkili.${message.author.id}.kadin`) || "0"

message.channel.send(embed.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
.setDescription(`${message.author} yetkilisinin **${message.guild.name}** sunucusundaki kayıtlarını aşağıya listeledim.

˃ Kullanıcı ID: **\`${message.author.id}\`**
˃ Sunucu İsmi: **\`${message.member.displayName}\`**
˃ Discord İsmi: **\`${message.author.tag}\`**

˃ Sunucuda toplam **${toplamteyit}** kişiye <@&${SRol.ErkekRol_1}> + <@&${SRol.KadınRol_1}> rolü vermiş.
˃ Sunucuda toplam **${erkekteyit}** kişiye <@&${SRol.ErkekRol_1}> rolü vermiş
˃ Sunucuda toplam **${kadınteyit}** kişiye <@&${SRol.KadınRol_1}> rolü vermiş`))}


if(member) {
let toplamteyit = db.get(`yetkili.${member.id}.teyit`) || "0"    
let erkekteyit = db.get(`yetkili.${member.id}.erkek`) || "0"     
let kadınteyit = db.get(`yetkili.${member.id}.kadin`) || "0"

message.channel.send(embed.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
.setDescription(`${member} yetkilisinin **${message.guild.name}** sunucusundaki kayıtlarını aşağıya listeledim.

˃ Kullanıcı ID: **\`${member.id}\`**
˃ Sunucu İsmi: **\`${member.displayName}\`**
˃ Discord İsmi: **\`${member.user.tag}\`**
━━━━━━━━━━━━━━━━━━━
˃ Sunucuda toplam **${toplamteyit}** kişiye <@&${SRol.ErkekRol_1}> + <@&${SRol.KadınRol_1}> rolü vermiş.
˃ Sunucuda toplam **${erkekteyit}** kişiye <@&${SRol.ErkekRol_1}> rolü vermiş
˃ Sunucuda toplam **${kadınteyit}** kişiye <@&${SRol.KadınRol_1}> rolü vermiş`))}

}}