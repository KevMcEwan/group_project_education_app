const PubSub = require('../helpers/pub_sub.js');

const IncorrectCardView = function (element) {
  this.element = element;
  this.lastIncorrectCard = null;
};

IncorrectCardView.prototype.bindEvents = function () {
  PubSub.subscribe('Game:incorrect-card', (evt) => {
    this.lastIncorrectCard = evt.detail;
    this.renderIncorrectCard();
  })
};

IncorrectCardView.prototype.renderIncorrectCard = function () {
  const elementSymbol = this.element.querySelector('#element-symbol');
  elementSymbol.textContent = this.lastIncorrectCard.symbol;
  const elementName = this.element.querySelector('#correct-element-name');
  elementName.textContent = this.lastIncorrectCard.name;
};


module.exports = IncorrectCardView;
