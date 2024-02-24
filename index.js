/*
    Author : ML
    Date of creation : 24/02/2024
    Date of last modification : 24/02/2024
    Version : v0.1
    Comments : Created with the help of Google Gemini and the discord.js documentation
*/

//Importing necessary discord.js classes for my bot
const Discord = require('discord.js');
const { Client, EmbedBuilder, SlashCommandBuilder, GatewayIntentBits } = require('discord.js');
const request = require('request');
const { token } = require('./config.json');
const client = new Discord.Client({
    intents: [ //Necessary intents for the bot to work
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ],
});

//If the bot is good to go
client.on('ready', async () => {
//Send 'Ready' to confirm
  console.log('Ready');

});

//Make the bot connect
client.login(token);