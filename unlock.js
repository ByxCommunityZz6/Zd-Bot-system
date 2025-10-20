module.exports = {
    name: "unlock",
    async execute(message, args) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You can't do that!");
        message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true });
        message.channel.send("Channel unlocked!");
    }
};
