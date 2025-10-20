module.exports = {
    name: "embed",
    description: "Send an embed message with optional mention",
    execute(message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) 
            return message.channel.send("You don't have permission to use this command!");

        if(args.length < 1) 
            return message.channel.send("Usage: /embed <title> : <description> : <mention(optional)>");

        // تقسيم args حسب ':'
        const input = args.join(" ").split(":");
        const title = input[0] ? input[0].trim() : " ";
        const description = input[1] ? input[1].trim() : " ";
        const mention = input[2] ? input[2].trim() : null;

        const embed = {
            title: title,
            description: description,
            color: "#00ff00"
        };

        if(mention) {
            message.channel.send({ content: mention, embed: embed });
        } else {
            message.channel.send({ embed: embed });
        }
    }
};
