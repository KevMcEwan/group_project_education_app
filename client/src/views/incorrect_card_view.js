const PubSub = require('../helpers/pub_sub.js');

const IncorrectCardView = function (element) {
  this.element = element;
  this.lastIncorrectCard = null;
};

IncorrectCardView.prototype.bindEvents = function () {
  PubSub.subscribe('Game:incorrect-card', (evt) => {
    this.lastIncorrectCard = evt.detail;
    console.log('Incorrect card view has this card:', this.lastIncorrectCard);
    this.renderIncorrectCard();
  })
};

IncorrectCardView.prototype.renderIncorrectCard = function () {
  const elementSymbol = this.element.querySelector('#element-symbol');
  elementSymbol.textContent = this.lastIncorrectCard.clue;
  const elementName = this.element.querySelector('#correct-element-name');
  elementName.textContent = this.lastIncorrectCard.answer;
};


module.exports = IncorrectCardView;
