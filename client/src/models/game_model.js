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

  // console.log('Inside the lowest card function', this.cards);
  const levels = this.cards.map((card) => {
    return card.gameLevel;
  })
  console.log(levels);
};


module.exports = Game;
