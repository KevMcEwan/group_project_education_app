const DataProvider = require('./models/data_provider_model.js');
const Game = require('./models/game_model.js');
const PubSub = require('./helpers/pub_sub.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  const gameStartForm = document.querySelector('#nav-contents');

  const game = new Game();
  game.getCards();

  PubSub.subscribe('Game:cards-ready', (evt) => {
      const lowestLevel = game.lowestGameLevelOnCards();
      game.getLatestLevelCards(lowestLevel);
  });


});
