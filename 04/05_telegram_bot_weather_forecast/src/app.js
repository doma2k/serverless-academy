import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import NodeCache from "node-cache";

const BOT_ID = "";
const WEATHER_ID = "";

const bot = new TelegramBot(BOT_ID, { polling: true });
const myCache = new NodeCache({ stdTTL: 303, checkperiod: 333 });

const PRIVAT =
  "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11";
const MONO = "https://api.monobank.ua/bank/currency";
const intervalRefs = {};
let city = "Kiev";

async function sendMessage(chatId, text, keyboard) {
  await bot.sendMessage(chatId, text, keyboard);
}

async function getExchangeEUR() {
  try {
    const data = await axios(PRIVAT);
    const filtered = data.data[0];
    const sell = parseFloat(filtered.buy).toFixed(1);
    const buy = parseFloat(filtered.sale).toFixed(1);
    const exchangeRate = {
      fiat: filtered.ccy,
      buy: buy,
      sale: sell,
    };
    return exchangeRate;
  } catch (err) {
    console.log("Ooooops PrivateBank midule failure\n");
  }
}

async function getExchangeUSD() {
  try {
    const data = await axios(MONO);
    const filtered = data.data[0];
    const sell = parseFloat(filtered.rateBuy).toFixed(1);
    const buy = parseFloat(filtered.rateSell).toFixed(1);
    const exchangeRate = {
      fiat: "USD",
      buy: buy,
      sale: sell,
    };
    return exchangeRate;
  } catch (err) {
    console.log("Oooops seems Mono have some issues\n");
  }
}

async function cashCash() {
  if (!myCache.has("USD") && !myCache.has("EUR")) {
    const cashMono = await getExchangeUSD();
    const cashPrivat = await getExchangeEUR();
    myCache.mset([
      { key: "USD", val: cashMono },
      { key: "EUR", val: cashPrivat },
    ]);
  }
  return myCache.mget(["USD", "EUR"]);
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
      keyboard: [[`Forecast in ${city}`], [`Exchange Rates`]],
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
      keyboard: [
        ["at intervals of 3 hours", "at intervals of 6 hours"],
        ["Return"],
      ],
      one_time_keyboard: false,
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
    interval = 2 * 1000;
  } else if (msg.text === "at intervals of 6 hours") {
    interval = 6 * 60 * 60 * 1000;
  }

  intervalRefs[chatId] = setInterval(async () => {
    const weatherData = await getWeatherData();
    await sendMessage(chatId, weatherData);
  }, interval);
}

async function exchangeHandler(msg) {
  const chatId = msg.chat.id;
  const message = "Exchange Rates:";
  const keyboard = {
    reply_markup: {
      keyboard: [["USD Price in MONO", "EUR Price in PRIVATE"], ["Return"]],
      one_time_keyboard: false,
    },
  };
  await sendMessage(chatId, message, keyboard);
}

function weatherBot() {
  bot.onText(/\/start/, startHandler);
  bot.onText(/Forecast in Kiev/, forecastHandler);
  bot.onText(/Exchange Rates/, exchangeHandler);
  bot.onText(
    /at intervals of 3 hours|at intervals of 6 hours/,
    intervalHandler
  );
  bot.onText(/Return/, startHandler);
  bot.onText(/USD Price in MONO/, async (msg) => {
    const chatId = msg.chat.id;
    const response = await cashCash();
    const responseX = response.USD
    sendMessage(chatId, `${responseX.fiat}\nbuy: ${responseX.buy} UAH\nsale: ${responseX.sale} UAH`);
  });
  bot.onText(/EUR Price in PRIVATE/, async (msg) => {
    const chatId = msg.chat.id;
    const response = await cashCash();
    const responseX = response.EUR
    sendMessage(chatId, `${responseX.fiat}\nbuy: ${responseX.buy} UAH\nsale: ${responseX.sale} UAH`);
  });
}

weatherBot();
