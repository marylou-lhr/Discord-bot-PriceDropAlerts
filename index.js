/*
    Author : ML
    Date of creation : 24/02/2024
    Date of last modification : 24/02/2024
    Version : v0.1
    Comments : Created with the help of Google Gemini and the discord.js documentation
*/

//Importing necessary discord.js classes for my bot
const Discord = require('discord.js');
const { Client, EmbedBuilder, GatewayIntentBits } = require('discord.js');
const request = require('request');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const client = new Discord.Client({
    intents: [ //Necessary intents for the bot to work
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ],
});
client.commands = new Collection();


const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

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

  //Creating the message which will send the list
  //Sending the list in a code-block style
  list_products_prices = '```\n';
  //Show a product & its price at a time
  for (let i=0 ; i < products.length ; i++) {
    list_products_prices += `${products[i]}: ${initialPrices[i]}\n`;
  }
  //Closing the list
  list_products_prices = '```';

  //Making sure that the user did input a slash command
  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);

    
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

  //Trying the command to see if it works when an user wants to execute it
	try {
		await command.execute(interaction);
	} 
  catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
  });
  
  //Adding the command
  await client.applicationCommands.set([cmdListPP]);

});

//Make the bot connect
client.login(token);