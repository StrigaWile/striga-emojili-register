const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const settings = require('./Base/Config/Striga')
const client = global.client = new Client();
const db = require('quick.db')
const moment = require('moment'); require("moment-duration-format");require("moment-timezone");
const fs = require('fs');

client.commands = new Collection();
client.aliases = new Collection();

fs.readdir('./Base/Commands/', (err, files) => {
if (err) console.error(err);
console.log(`Toplam ${files.length} dosya var ve yükleniyor. (づ｡◕‿‿◕｡)づ`);
files.forEach(f => {
fs.readdir("./Base/Commands/" + f, (err2, files2) => {
files2.forEach(file => {
let props = require(`./Base/Commands/${f}/` + file);
console.log(`Bir dosya yükleniyor "${props.conf.name}". (ง'̀-'́)ง`);
client.commands.set(props.conf.name, props);
props.conf.aliases.forEach((alias) => {
client.aliases.set(alias, props.conf.name);
})})})})});

fs.readdir("./Base/Events", (err, files) => {
if(err) return console.error(err);
files.filter(file => file.endsWith(".js")).forEach(file => {
let prop = require(`./Base/Events/${file}`);
if(!prop.conf) return;
client.on(prop.conf.name, prop)})})

client.login(settings.token).then(console.log('Hazırız Kaptan Yelkenler Fora Falan Fıstık İşte Sür Gidelim. ( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)')).catch(err => console.error('API bağlanamadı işte hata sebebi: ' + err));


let aylartoplam = {"01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
global.aylar = aylartoplam;
const tarihsel = global.tarihsel = function(tarih) {
let tarihci = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + global.aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY HH:mm")   
return tarihci};
const sayilariCevir = global.sayilariCevir = function(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")};
const tarihhesapla = global.tarihHesapla = (date) => {
const startedAt = Date.parse(date);
var msecs = Math.abs(new Date() - startedAt);
const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365)); msecs -= years * 1000 * 60 * 60 * 24 * 365; const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30)); msecs -= months * 1000 * 60 * 60 * 24 * 30; const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7)); msecs -= weeks * 1000 * 60 * 60 * 24 * 7; const days = Math.floor(msecs / (1000 * 60 * 60 * 24)); msecs -= days * 1000 * 60 * 60 * 24; const hours = Math.floor(msecs / (1000 * 60 * 60)); msecs -= hours * 1000 * 60 * 60; const mins = Math.floor((msecs / (1000 * 60))); msecs -= mins * 1000 * 60; const secs = Math.floor(msecs / 1000); msecs -= secs * 1000;
var string = ""; if (years > 0) string += `${years} yıl`; else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`; else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`; else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`; else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`; else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`; else if (secs > 0) string += `${secs} saniye`; else string += `saniyeler`; string = string.trim(); return `${string} önce`;};
