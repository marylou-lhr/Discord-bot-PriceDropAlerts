/*
    Author : ML
    Date of creation : 24/02/2024
    Date of last modification : 24/02/2024
    Version : v1.0
    Comments : Created with the help of Google Gemini and the discord.js documentation
*/

//Importing the class
const { SlashCommandBuilder } = require('discord.js');
const buildProductList = require('../../list_products_prices.js');

module.exports = {
//Creating the slash command that lists each product and their price
    data: cmdListPP = new SlashCommandBuilder()
        .setName('list_products_prices')
        .setDescription('Show the list of the monitored products and their price'),
    //Enabling the command
    async execute(interaction) {
        //Send a new message showing the list
        await interaction.deferReply();
        const productList = buildProductList();
        await interaction.editReply(productList); // Send the reply with the list
    }
}