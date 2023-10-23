import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const BOT_ID = "";
const WEATHER_ID = "";
const bot = new TelegramBot(BOT_ID, { polling: true });
const intervalRefs = {};
let city = "Cascais";

async function sendMessage(chatId, text, keyboard) {
  await bot.sendMessage(chatId, text, keyboard);
}

async function getWeatherData() {
  const geoResponse = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER_ID}`
  );
  const location = geoResponse.data[0];
  const lat = location.lat.toFixed(2);
  const lon = location.lon.toFixed(2);
  const country = location.country;

  const weatherResponse = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_ID}`
  );
  const weatherData = weatherResponse.data.list[0];
  const temp = weatherData.main.temp;
  const weather = weatherData.weather;

  return `${location.name} ${country}\nWeather: ${weather[0].main}\nDescription: ${weather[0].description}\nTemperature: ${temp}°C`;
}

function startHandler(msg) {
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
  sendMessage(chatId, message, keyboard);
}

async function forecastHandler(msg) {
  const chatId = msg.chat.id;
  const keyboard = {
    reply_markup: {
      keyboard: [["at intervals of 3 hours", "at intervals of 6 hours"]],
      one_time_keyboard: true,
    },
  };
  await sendMessage(chatId, "This is the current forecast:");
  const weatherData = await getWeatherData();
  await sendMessage(chatId, weatherData);
  await sendMessage(chatId, "Please select the forecast interval:", keyboard);
}

function intervalHandler(msg) {
  const chatId = msg.chat.id;
  if (intervalRefs[chatId]) {
    clearInterval(intervalRefs[chatId]);
  }

  let interval;
  if (msg.text === "at intervals of 3 hours") {
    interval = 3 * 60 * 60 * 1000;
  } else if (msg.text === "at intervals of 6 hours") {
    interval = 6 * 60 * 60 * 1000;
  }

  intervalRefs[chatId] = setInterval(async () => {
    const weatherData = await getWeatherData();
    await sendMessage(chatId, weatherData);
  }, interval);
}

function weatherBot() {
  bot.onText(/\/start/, startHandler);
  bot.onText(/Forecast in Cascais/, forecastHandler);
  bot.onText(/at intervals of 3 hours|at intervals of 6 hours/, intervalHandler);
}

weatherBot();
