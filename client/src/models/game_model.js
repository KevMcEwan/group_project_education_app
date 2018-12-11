const RequestHelper = require('../helpers/request_helper.js');
const DataProvider = require('./data_provider_model.js');
const PubSub = require('../helpers/pub_sub.js');


const Game = function() {
  this.cards =[];
};


Game.prototype.getCards = function () {
  const dataForGame = new DataProvider();
  dataForGame.bindEvents();
  dataForGame.getData();
  PubSub.subscribe('Data:data-ready', (evt) => {
    this.cards = evt.detail;
    console.log('Game model cards:', this.cards);
    PubSub.publish('Game:cards-ready', this.cards);
  })
};

Game.prototype.lowestGameLevelOnCards = function () {
  const levels = this.cards.map((card) => {
    return card.gameLevel;
  });
  return minLevel = levels.sort()[0];
};

Game.prototype.getLatestLevelCards = function (level) {
  const currentLevelCards = this.cards.filter((card) => {
    if (card.gameLevel === level) {
      return card;
    };
  });
  this.cards = currentLevelCards;
};

Game.prototype.getRandomCard = function () {
  const min = Math.ceil(0);
  const max = Math.floor(this.cards.length);
  const cardIndex = Math.floor(Math.random() * (max - min)) + min;
  return this.cards[cardIndex];
};


module.exports = Game;
