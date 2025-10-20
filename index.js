const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client();
const prefix = "!";
const token = process.env.DISCORD_BOT_TOKEN;

client.login(token);

client.once("ready", () => {
    console.log(`Bot is online! Logged in as ${client.user.tag}`);
});

client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("message", async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("هناك خطأ في تنفيذ الأمر!");
    }
});
