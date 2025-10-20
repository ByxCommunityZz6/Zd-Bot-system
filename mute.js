module.exports = {
    name: "mute",
    async execute(message, args) {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You can't do that!");
        const member = message.mentions.members.first();
        if(!member) return message.channel.send("Mention a member to mute!");
        let role = message.guild.roles.cache.find(r => r.name === "Muted");
        if(!role) role = await message.guild.roles.create({ data: { name: "Muted", permissions: [] } });
        member.roles.add(role);
        message.channel.send(`${member.user.tag} is muted!`);
    }
};
