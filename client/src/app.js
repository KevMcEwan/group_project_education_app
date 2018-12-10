const Cards = require('./models/cards_model.js');
const Game = require('./models/game_model.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  const gameStart = document.querySelector('.nav-contents');
  // console.log(gameStart);
  const cardPack = 'http://localhost:3000/api/card-pack';
  const cards = new Cards(cardPack, gameStart);
  cards.bindEvents();

  const game = new Game();
  game.getCards();


});
