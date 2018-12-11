const RequestHelper = require('../helpers/request_helper.js');
const DataProvider = require('./data_provider_model.js');
const PubSub = require('../helpers/pub_sub.js');


const Game = function() {
  this.cards =[];
  this.userAnswer = null;
  this.currentCardName = null;
  this.currentCard = null;
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

Game.prototype.getUserAnswer = function () {
  PubSub.subscribe('FormView:answer-submitted', (evt) => {
    const userAnswer = evt.detail.toLowerCase();
    this.userAnswer = userAnswer;
    this.checkUserAnswer();
  });
};

Game.prototype.getCurrentCard = function () {
  PubSub.subscribe('FormView:current-card', (evt) => {
    this.currentCard = evt.detail;
    this.currentCardName = evt.detail.name.toLowerCase();
  });
};

Game.prototype.checkUserAnswer = function () {
  if (this.userAnswer === this.currentCardName) {
    const cardID = this.currentCard._id;
    console.log(cardID);
    // const cardGameLevel = this.currentCard.gameLevel;
    const requestHelper = new RequestHelper('http://localhost:3000/api/card-pack');
    const updatedCard = {
      name: this.currentCard.name,
      symbol: this.currentCard.symbol,
      atomicNumber: this.currentCard.atomicNumber,
      colour: this.currentCard.colour,
      group: this.currentCard.group,
      gameLevel: this.currentCard.gameLevel += 1
    };
    requestHelper.put(cardID, updatedCard);
    // TODO if true you will need to update level in database and splice from array and re-render the element form view.
    // TODO re-render needs to consider if any cards are left in the array.
  // }
  // else {
    // TODO render card on incorrect pile, and re-render element form view.
    // TODO re-render needs to consider if any cards are left in the array.
  };


  console.log('User answer:', this.userAnswer);
  console.log('Current card', this.currentCardName);
};

module.exports = Game;
