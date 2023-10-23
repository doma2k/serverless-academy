import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const BOT_ID = "";
const WEATHER_ID = "";
const bot = new TelegramBot(BOT_ID, { polling: true });
const intervalRefs = {};
let city = "Cascais";

async function msgSend(chatId, weatherData) {
  bot.sendMessage(chatId, weatherData);
}

async function getData() {
  const geoGet = await axios({
    method: "get",
    url: `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER_ID}`,
    responseType: "json",
  });

  const cityName = geoGet.data[0].name;
  const lat = geoGet.data[0].lat.toFixed(2);
  const lon = geoGet.data[0].lon.toFixed(2);
  const country = geoGet.data[0].country;
  const wetherGet = await axios({
    method: "get",
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_ID}`,
    responseType: "json",
  });
  const weatherDAta = wetherGet.data.list[(0, 1)];
  const temp = weatherDAta.main.temp;
  const weather = weatherDAta.weather;
  let weatherMessage;
  return (weatherMessage = `${cityName} ${country}\nWeather: ${weather[0].main}\nDescription: ${weather[0].description}\nTempreture: ${temp}°C\n`);
}

async function wBot() {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const message = "Welcome to the Weather Forecast bot:";
    const keyboard = {
      reply_markup: {
        keyboard: [["Forecast in Cascais"]],
        one_time_keyboard: true,
      },
    };
    if (intervalRefs[chatId]) {
      clearInterval(intervalRefs[chatId]);
    }
    bot.sendMessage(chatId, message, keyboard);
  });

  bot.onText(/Forecast in Cascais/, async (msg) => {
    const chatId = msg.chat.id;
    const keyboard = {
      reply_markup: {
        keyboard: [["at intervals of 3 hours"], ["at intervals of 6 hours"]],
        one_time_keyboard: true,
      },
    };
    await bot.sendMessage(
      chatId,
      "This is current forecast:",
    );
    const weatherData = await getData();
    await msgSend(chatId, weatherData);
    await bot.sendMessage(
      chatId,
      "Please select the forecast interval:",
      keyboard
    );
  });

  bot.onText(/at intervals of 3 hours|at intervals of 6 hours/, (msg) => {
    const chatId = msg.chat.id;
    if (intervalRefs[chatId]) {
      clearInterval(intervalRefs[chatId]);
    }
    if (msg.text === "at intervals of 3 hours") {
      const interval = 3 * 60 * 60 * 1000;
      intervalRefs[chatId] = setInterval(async () => {
        const weatherData = await getData();
        await msgSend(chatId, weatherData);
      }, interval);
    } else if (msg.text === "at intervals of 6 hours") {
      const interval = 6 * 60 * 60 * 1000;
      intervalRefs[chatId] = setInterval(async () => {
        const weatherData = await getData();
        await msgSend(chatId, weatherData);
      }, interval);
    }
  });
}

wBot();
