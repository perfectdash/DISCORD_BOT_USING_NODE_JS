require("dotenv").config();

const { Client, WebhookClient} = require("discord.js");
const client = new Client();
const PREFIX = "$";

const webhookClient = new WebhookClient(
   process.env.WEBHOOK_ID,
   process.env.WEBHOOK_TOKEN,
);


client.on('ready',()=>{
     console.log(`${client.user.tag} has been logged in`);
});


client.on('messageReactionAdd',(reaction,user)=> {
    const {name} = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === process.env.USER_ID){
       switch(name){
         case '�':
            member.roles.add('1135664305304522782');
            break;
         case '�':
            member.roles.add('1135664479355535480');
            break;
         case '�':
            member.roles.add('1135664560775380992');
            break;
         case '�':
            member.roles.add('1135664689163026532');
            break;
       }
    }
});


client.on('message', async (message)=>{
     if(message.author.bot){
        return ;
     }

     if(message.content.startsWith(PREFIX)){
         const  [CMD_NAME, ...args] = await message.content
         .trim()
         .substring(PREFIX.length)
         .split(/\s+/);

          console.log(CMD_NAME);
          console.log(args);

          if(CMD_NAME ==='kick'){
             if(!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply(`You don't have permissions to use that command`);
             if(args.length ===0){
                return message.reply('Please provide an ID');
             }
             const member =  message.guild.members.cache.get(args[0]);
             if(member){
                member
                .kick()
                .then((member)=>{ message.channel.send(`${member} was kicked`)})
                .catch((err)=>message.channel.send(`I can't kick the user`));
             }else{
                message.channel.send('Member not found');
             }
          }else if(CMD_NAME ==='ban'){
             if(!message.member.hasPermission('BAN_MEMBERS'))
                 return message.reply(`You don't have permissions to use that command`);
             if(args.length ===0){
               return message.reply('Please provide an ID');
             }
             try{
               const user = await message.guild.members.ban(args[0])
               message.channel.send(`User was banned successfully`);
             }catch(err){
                message.channel.send(`An Error Occured. Either I don't have the permission or user not found`);
             }
            
            
          }else if(CMD_NAME === 'announcement'){
               console.log(args);
               const msg   =  args.join(' ');
               console.log(msg);
               webhookClient.send(msg);
          }
     }

});

client.login(process.env.DISCORD_BOT_TOKEN);

