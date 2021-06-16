const {MessageEmbed} = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
moment.locale("tr");

module.exports = {
conf: {name: 'kke', aliases: ["kimtarafındankayıtedilmiş", "kimkayıtetmiş", "ktke"], help: "!isimler @Striga/ID"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.KayıtYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir kullanıcı belirtmeniz gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let isimler = db.get(`uye.${member.id}.isimleri`) || [];
isimlerData = isimler.reverse().reverse();
let page = 1;
let isimlerinformation = isimlerData.length > 0 ? isimlerData.map(x => `\`${x.İsimleri}\` - (${x.Rol}) - Yetkili <@${x.Yetkili}>(\`${x.Yetkili}\`)`) : `${member} adlı kullanıcının herhangi bir isimler kayıtı yok.`

if(isimlerData.length < 1) { 
message.channel.send(embed.setDescription(`${isimlerinformation}`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Onayla))}

if(isimlerData.length > 0) { 
    
var isimlerListe = await message.channel.send(embed.setDescription(`
${member} adlı kullanıcının ${isimlerData.length} tane ismi bulundu kayıt yapan yetkiliyle birlikte listeledim.

${isimlerinformation.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n")}`)).then(message.react(SEmoji.Onayla))


if(isimlerinformation.length > 10) {
await isimlerListe.react(`◀`);
await isimlerListe.react(`🔴`);
await isimlerListe.react(`▶`);

let collector = isimlerListe.createReactionCollector((react, user) => ["◀", "🔴", "▶"].some(e => e == react.emoji.name) && user.id == message.member.id, {time: 200000});
collector.on("collect", (react, user) => {
if (react.emoji.name == "▶") {
if (isimlerinformation.slice((page + 1) * 10 - 10, (page + 1) * 10).length <= 0) return;
page += 1;
let dataNext = isimlerinformation.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
isimlerListe.edit(embed.setDescription(`
${member} adlı kullanıcının ${isimlerData.length} tane ismi bulundu kayıt yapan yetkiliyle birlikte listeledim.

${dataNext}`))
}


if (react.emoji.name == "◀") {
if (isimlerinformation.slice((page - 1) * 10 - 10, (page - 1) * 10).length <= 0) return;
page -= 1;
let dataEx = isimlerinformation.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
isimlerListe.edit(embed.setDescription(`
${member} adlı kullanıcının ${isimlerData.length} tane ismi bulundu kayıt yapan yetkiliyle birlikte listeledim.

${dataEx}`))
}
if (react.emoji.name == "🔴") {
isimlerListe.delete();
collector.stop();}})
}}








}}