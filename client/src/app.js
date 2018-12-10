const DataProvider = require('./models/data_provider_model.js');
const Game = require('./models/game_model.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  const gameStartForm = document.querySelector('#nav-contents');
  // console.log(gameStart);
  const cardPackURL = 'http://localhost:3000/api/card-pack';
  // const cards = new Cards();//cardPackURL, gameStartForm);

  const game = new Game();
  game.getCards();


});
