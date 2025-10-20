module.exports = {
    name: "nroom",
    description: "Create a new room/channel with type and permissions",
    async execute(message, args) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) 
            return message.channel.send("You don't have permission to use this command!");

        if(args.length < 3)
            return message.channel.send("Usage: /Nroom <room name> : <type: text/voice> : <permissions> (everyone/admin)");

        // تقسيم args حسب ':'
        const input = args.join(" ").split(":");
        const roomName = input[0] ? input[0].trim() : "new-room";
        const type = input[1] ? input[1].trim().toLowerCase() : "text";
        const perms = input[2] ? input[2].trim().toLowerCase() : "everyone";

        // تحديد نوع الروم
        const channelType = type === "voice" ? "GUILD_VOICE" : "GUILD_TEXT";

        // إعداد الصلاحيات
        let permissionOverwrites = [];
        if(perms === "everyone") {
            permissionOverwrites.push({
                id: message.guild.roles.everyone.id,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "CONNECT"]
            });
        } else if(perms === "admin") {
            permissionOverwrites.push({
                id: message.guild.roles.everyone.id,
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "CONNECT"]
            });
        }

        // إنشاء الروم
        message.guild.channels.create(roomName, {
            type: channelType,
            permissionOverwrites: permissionOverwrites
        }).then(channel => {
            message.channel.send(`Channel ${channel.name} created!`);
        }).catch(err => {
            console.error(err);
            message.channel.send("Error creating the channel!");
        });
    }
};
