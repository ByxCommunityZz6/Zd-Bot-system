module.exports = {
    name: "kick",
    execute(message, args) {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You can't do that!");
        const member = message.mentions.members.first();
        if(!member) return message.channel.send("Mention a member to kick!");
        member.kick().then(() => message.channel.send(`${member.user.tag} was kicked!`));
    }
};
