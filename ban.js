module.exports = {
    name: "ban",
    execute(message, args) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You can't do that!");
        const member = message.mentions.members.first();
        if(!member) return message.channel.send("Mention a member to ban!");
        member.ban().then(() => message.channel.send(`${member.user.tag} was banned!`));
    }
};
