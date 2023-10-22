import { Command } from "commander";
import TelegramBot from "node-telegram-bot-api";
import fs from "node:fs/promises"

process.noDeprecation = true;

// Use your credentials
const token = BOT_ID;
const chatId = CHAT_ID;

const program = new Command();
const bot = new TelegramBot(token);

program
  .name("app.js")
  .description("Serverless school practice.")
  .version("0.0.1");

program
  .command("send-message <message>")
  .description("Send a message to your Telegram bot from the terminal.")
  .action(async (message) => {
    try {
      await bot.sendMessage(chatId, message);
    } catch (error) {
      console.error("Error sending the message:", error);
    }
  });

program
  .command("send-photo <path>")
  .description("Send a photo to your Telegram bot from the terminal.")
  .action(async (path) => {
    try {
      const photo = await fs.readFile(path);
      await bot.sendPhoto(chatId, photo);
    } catch (error) {
      console.error("Error sending the photo:", error);
    }
  });

program.parseAsync()
