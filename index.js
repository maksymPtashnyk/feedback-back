const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3001;

const telegramToken = '6786988028:AAHkQt0BdOC-wHWZR4dQ9SodgMcV0BwSQIg';
const bot = new TelegramBot(telegramToken);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Дозвіл OPTIONS запитів і пропускати їх без обробки
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


app.use(express.json());

app.post('/feedback', (req, res) => {
  const { userName, review, park } = req.body;

  // Надсилаємо відгук в Телеграм
  bot.sendMessage('-1002024901522', `Парк ${park}, відгук від ${userName} \n${review} `)
    .then(() => {
      res.send('Відгук надіслано успішно');
    })
    .catch((error) => {
      console.error('Помилка надсилання відгуку:', error);
      res.status(500).send('Помилка надсилання відгуку');
    });
});

// Стартуємо сервер
app.listen(port, () => {
  console.log(`Сервер запущено на порті ${port}`);
});
