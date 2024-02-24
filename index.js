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
const client = new Discord.Client({
    intents: [ //Necessary intents for the bot to work
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ],
});