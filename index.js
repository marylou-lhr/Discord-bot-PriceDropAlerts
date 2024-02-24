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

  //ID of the channel the embedded message will be sent in
  const channelId = '1210709927962742803';

  // Amazon URL of the products I want the bot to keep an eye on
  //Note to self : Delete this line when I will know that it works
  const products = {
    'graphicCard': 'B0C49S5R55',
    'processor': 'B08166SLDF',
    'motherboard': 'B089HDHVV6',
    'ram': 'B0B5CDVS7S',
    'ssd': 'B0BS1WWDQB',
    'powerSupply': 'B0991TZ399',
    'case': 'B07YQ724L8',
    'ventilation': 'B0B5L3K293',
    'keyboard': 'B07W6JFM87'
  };

  //Images of the products to show in the embedded message
  const imgProducts = {
    'graphicCard': 'https://m.media-amazon.com/images/I/714nXgTiuAL._AC_SX425_.jpg',
    'processor': 'https://m.media-amazon.com/images/I/61twhaihHtL._AC_SL1500_.jpg',
    'motherboard': 'https://m.media-amazon.com/images/I/51zDXiQ0PqL._AC_SL1500_.jpg',
    'ram': 'https://m.media-amazon.com/images/I/61YG-Rm-ZAL._AC_SL1500_.jpg',
    'ssd': 'https://m.media-amazon.com/images/I/51oiVSSsxBL._AC_SL1000_.jpg',
    'powerSupply': 'https://m.media-amazon.com/images/I/81eLlIQ5PsL._AC_SL1500_.jpg',
    'case': 'https://m.media-amazon.com/images/I/51NgRrE-OzL._AC_SL1024_.jpg',
    'ventilation': 'https://m.media-amazon.com/images/I/71MQHn9FlUL._SL1500_.jpg',
    'keyboard': 'https://m.media-amazon.com/images/I/71x6vEFr69L._AC_SL1500_.jpg'
  }

  //Initial prices of each product in order to make comparisons
  const initialPrices = {
    'graphicCard': 299.80,
    'processeur': 163,
    'carteMere': 113.35,
    'ram': 63.78,
    'ssd': 82.73,
    'powerSupply': 65.99,
    'case': 64.99,
    'ventilo': 22.90,
    'keyboard': 119
  };

  //Creating the slash command that lists each product and their price
  const cmdListPP = new SlashCommandBuilder()
    .setName('listProductsPrices')
    .setDescription('Show the list of the monitored products and their price')

  //Creating the message which will send the list
  //Sending the list in a code-block style
  listProductsPrices = '```\n';
  //Show a product & its price at a time
  for (let i=0 ; i < products.length ; i++) {
    listProductsPrices += `${products[i]}: ${initialPrices[i]}\n`;
  }
  //Closing the list
  listProductsPrices = '```';

  //Enabling the command
  async function execute(interaction) {
    //Send a new message showing the list
    await interaction.followUp(listProductsPrices);
  }

  //Adding the command
  await client.applicationCommands.set([cmdListPP]);

});

//Make the bot connect
client.login(token);