import { Command } from 'commander';
import TelegramBot from 'node-telegram-bot-api';

const token = '6286796097:AAGxpV-uS_ly30_I3Q_8m8bRHGkcCcNP1AQ';
const chatId = 1933874030
const program = new Command();
const bot = new TelegramBot(token, {polling: true});

program
  .name('app.js')
  .description('Serverless school practice.')
  .version('0.0.1');

program.command('send-message')
       .description('Send message in to your Telegram bot from terminal.')
   .argument('<string>', 'Type your mesage here.')
  .action((str) => {
    try{
      bot.sendMessage(chatId, str);
    }catch(err){
      console.log("some error", err)
    } 
         console.log(str.split());
         
              process.exit(0)
  });

program.command('send-photo')
  .description('Send picture in to your Telegram bot from terminal.')
  .argument('<string>', 'file location,example: "/path/to/the/photo.png" ')
  .option('--first', 'display just the first substring')
  .action((str) => {
    console.log(str.split())
  });

program.parse();



