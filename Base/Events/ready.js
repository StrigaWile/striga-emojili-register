const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const settings = require('../Config/Striga')
module.exports = () => {
client.user.setPresence({ activity: { name: settings.statusText }, status: settings.status });
if (settings.voiceID && client.channels.cache.has(settings.voiceID)) client.channels.cache.get(settings.voiceID).join().catch();
console.log(`Sesteyim Bağlandım. ͡° ͜ʖ ͡°`)
}
module.exports.conf = {name: "ready"}