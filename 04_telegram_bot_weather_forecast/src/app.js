import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

// const bot = new TelegramBot(token, { polling: true });

const BOT_ID = "5869901140:AAEqaOSk5ggcpNdCYHz9AmIKQIgOyXlD-r8";
const WEATHER_ID = "9f8556da2451252d5484540ffd465ef1";
const token = BOT_ID;
const chatId = CHAT_ID;

async function getData() {
  let city = "Lisbon";
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
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_ID}`,
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
