const PubSub = require('../helpers/pub_sub.js');


const FormView = function (element, currentCard) {
  this.element = element;
  this.currentCard = currentCard;
};


FormView.prototype.bindEvents = function () {
  this.element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const userAnswer = evt.target.textInputFieldID.value;
    PubSub.publish('FormView:answer-submitted', userAnswer);
    evt.target.reset();
  });
  PubSub.subscribe('Game:next-card', (evt) => {
    this.currentCard = evt.detail;
    this.render();
  });
};

FormView.prototype.render = function () {
  const elementSymbol = this.element.querySelector('#element-symbol');
  elementSymbol.textContent = this.currentCard.symbol;
  PubSub.publish('FormView:current-card', this.currentCard);
};


module.exports = FormView;
