/*
    Author : ML
    Date of creation : 24/02/2024
    Date of last modification : 24/02/2024
    Version : v1.0
    Comments : Created with the help of Google Gemini and the discord.js documentation
*/

//Importing the class
const { SlashCommandBuilder } = require('discord.js');

//Creating the message which will send the list
//Sending the list in a code-block style
list_products_prices = '```\n';

//Show a product & its price at a time
for (let i=0 ; i < products.length ; i++) {
    list_products_prices += `${products[i]}: ${initialPrices[i]}\n`;
}
//Closing the list
list_products_prices = '```';

module.exports = {
//Creating the slash command that lists each product and their price
    data: new SlashCommandBuilder()
        .setName('list_products_prices')
        .setDescription('Show the list of the monitored products and their price'),
    //Enabling the command
    async execute(interaction) {
        //Send a new message showing the list
        await interaction.followUp(list_products_prices);
    }
}