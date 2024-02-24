/*
    Author : ML
    Date of creation : 24/02/2024
    Date of last modification : 24/02/2024
    Version : v0.1
    Comments : Created with the help of Google Gemini and the discord.js documentation
*/

//Importing necessary discord.js classes for my bot
const Discord = require('discord.js');
const request = require('request');
const fs = require('node:fs');
const path = require('node:path');
const productsFile = require('./products.js');
const { Client, Collection, EmbedBuilder, Events, GatewayIntentBits} = require('discord.js');
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
      } 
      else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  });

});

//Make the bot connect
client.login(token);