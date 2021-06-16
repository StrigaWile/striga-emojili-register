const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const settings = require('../Config/Striga')
const roller = require('../Config/RolesConfig.json')
const kanallar = require('../Config/ChannelsConfig.json')

module.exports = async (member) => {
let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
if(guvenilirlik) {
member.roles.remove(roller.KayıtsızRolü)        
member.roles.add(roller.ŞüpheliRolü)    
member.guild.channels.cache.get(kanallar.Şüpheli_Log).send(new MessageEmbed().setAuthor(member.guild.name, member.guild.iconURL({dynamic:true})).setDescription(`• ${member} adlı üyenin hesabı yeni açıldığı için tüm rollerini aldım ve <@&${roller.ŞüpheliRolü}> verdim.`).setTimestamp().setColor(client.warnColor()))
} else {     
ServerHg(member)
member.roles.add(roller.KayıtsızRolü)
}

}
module.exports.conf = {name: "guildMemberAdd"}

function ServerHg(member) {
member.guild.channels.cache.get(kanallar.HosGeldin).send(`:tada: Sunucumuza hoş geldin ${member} (\`${member.id}\`)\n
Hesabın **${global.tarihsel(member.user.createdAt)}** tarihinde (${global.tarihHesapla(member.user.createdAt)}) oluşturulmuş.\n
Sunucumuzun kurallarına <#${kanallar.Kurallar}> göz atmanız tavsiye ederiz ceza işlemlerini kurallara göre yapıyoruz.\n
Sunucumuza Kayıt olmak için solda ki odalara girip ses teyit vererek kayıt olabilirsin.\n
Seninle birlikte sunucumuz **${member.guild.memberCount}** kişi oldu ! Tagımızı (**${settings.sunucuTag}**) alarak ailemizin bir parçası olabilirsin.`)}