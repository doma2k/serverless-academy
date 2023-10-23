import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

// const bot = new TelegramBot(token, { polling: true });

const BOT_ID = "";
const WEATHER_ID = "";
const token = BOT_ID;

async function getData() {
  let city = "Cascais";
  const geoGet = await axios({
    method: "get",
    url: `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER_ID}`,
    responseType: "json",
  });

  const cityName = geoGet.data[0].name;
  const lat = geoGet.data[0].lat.toFixed(2);
  const lon = geoGet.data[0].lon.toFixed(2);
  const country = geoGet.data[0].country;
  console.log(cityName, country, lat, lon);

  const wetherGet = await axios({
    method: "get",
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_ID}`,
    responseType: "json",
  });

  const weatherDAta = wetherGet.data;
  console.log(weatherDAta);
}

getData();
// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;

//   bot.sendMessage(chatId, weather.data);
// });
