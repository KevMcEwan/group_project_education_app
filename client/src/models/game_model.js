const RequestHelper = require('../helpers/request_helper.js');
const DataProvider = require('./data_provider_model.js');
const PubSub = require('../helpers/pub_sub.js');


const Game = function() {
  this.cards =[];
  this.userAnswer = null;
  this.currentCardName = null;
  this.currentCard = null;
  this.currentCardIndex = null;
  this.currentGameLevel = null;
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
  const minLevel = levels.sort()[0];
  this.currentGameLevel = minLevel;
  return minLevel;
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
  this.currentCardIndex = cardIndex;
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
    this.cards.splice(this.currentCardIndex, 1);
    // console.log(this.cards.length);
    this.checkForRemainingCardsAndContinueOrEnd();
  } else {
    PubSub.publish('Game:incorrect-card', this.currentCard);
    const nextCard = this.getRandomCard();
    PubSub.publish('Game:next-card', nextCard);
  };
  console.log('User answer:', this.userAnswer);
  console.log('Current card', this.currentCardName);
};

Game.prototype.checkForRemainingCardsAndContinueOrEnd = function () {
  if (this.cards.length === 0) {
    console.log(`You have completed level ${this.currentGameLevel}!`);
    PubSub.publish('Game:no-cards-remaining', this.currentGameLevel);
  } else {
    const nextCard = this.getRandomCard();
    PubSub.publish('Game:next-card', nextCard);
  };
};



module.exports = Game;
