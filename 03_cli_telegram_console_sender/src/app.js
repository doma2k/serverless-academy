import { Command } from 'commander';
import TelegramBot from 'node-telegram-bot-api';

const token = 'YOUR_TELEGRAM_BOT_TOKEN';

const program = new Command();
// const bot = new TelegramBot(token, {polling: true});

program
  .name('app.js')
  .description('Serverless school practice.')
  .version('0.0.1');

program.command('send-message')
  .description('Send message in to your Telegram bot from terminal.')
  .argument('<string>', 'Type your mesage here.')
  .action((str) => {
    console.log(str.split());
  });

program.command('send-photo')
  .description('Send picture in to your Telegram bot from terminal.')
  .argument('<string>', 'file location,example: "/path/to/the/photo.png" ')
  .option('--first', 'display just the first substring')
  .action((str) => {
    console.log(str.split())
  });

program.parse();