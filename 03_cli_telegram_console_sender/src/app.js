import { Command } from "commander";
import TelegramBot from "node-telegram-bot-api";

const token = "5869901140:AAEqaOSk5ggcpNdCYHz9AmIKQIgOyXlD-r8";
const chatId = 1933874030;
const program = new Command();
const bot = new TelegramBot(token);

async function app() {
  program
    .name("app.js")
    .description("Serverless school practice.")
    .version("0.0.1");

  program
    .command("send-message")
    .description("Send message in to your Telegram bot from terminal.")
    .argument("<message>", "Type your message here.")

  program
    .command("send-photo")
    .description("Send picture in to your Telegram bot from terminal.")
    .argument("<string>", 'file location,example: "/path/to/the/photo.png" ')

  const appArgs = program.parse();

  if (appArgs.args[0] === "send-message") {
    bot.sendMessage(chatId, appArgs.args[1])
  }
}

app();
