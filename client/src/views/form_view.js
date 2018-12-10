const PubSub = require('../helpers/pub_sub.js');


const FormView = function (element, currentCard) {
  this.element = element;
  this.currentCard = currentCard;
};


FormView.prototype.bindEvents = function () {
  this.element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    //TODO get textbox content entered by user
    PubSub.publish('FormView:answer-submitted') 
    this.element.reset();

  })
};

FormView.prototype.render = function () {
  const elementSymbol = this.element.querySelector('#element-symbol');
  elementSymbol.textContent = this.currentCard.symbol;
};


module.exports = FormView;
