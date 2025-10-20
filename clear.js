module.exports = {
    name: "clear",
    async execute(message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do that!");
        const amount = parseInt(args[0]);
        if(!amount) return message.channel.send("Specify number of messages to delete!");
        message.channel.bulkDelete(amount + 1).catch(err => message.channel.send("Error deleting messages!"));
    }
};
