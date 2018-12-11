const PubSub = require('../helpers/pub_sub.js');


const FormView = function (element, currentCard) {
  this.element = element;
  this.currentCard = currentCard;
  this.lastCompletedLevel = null;
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
  PubSub.subscribe('Game:no-cards-remaining', (evt) => {
    this.lastCompletedLevel = evt.detail;
    this.renderLevelCompleteMessage();
  })
};

FormView.prototype.render = function () {
  const elementSymbol = this.element.querySelector('#element-symbol');
  elementSymbol.textContent = this.currentCard.symbol;
  PubSub.publish('FormView:current-card', this.currentCard);
};

FormView.prototype.renderLevelCompleteMessage = function () {
  this.element.innerHTML = '';
  const completedLevelDiv = document.createElement('div');
  completedLevelDiv.setAttribute('id', 'level-completed');
  this.element.appendChild(completedLevelDiv);

  const completedLevelMessage = document.createElement('h2');
  completedLevelMessage.setAttribute('id', 'message');
  completedLevelMessage.textContent = `You have completed Level ${this.lastCompletedLevel}!`;
  completedLevelDiv.appendChild(completedLevelMessage);

  const nextLevelButton = document.createElement('button');
  nextLevelButton.setAttribute('id', 'next-level-button');
  nextLevelButton.textContent = 'Start next level';
  nextLevelButton.value = 'nextlevel';
  nextLevelButton.addEventListener('click', (evt) => {
    PubSub.publish('FormView:start-next-level', evt.target.value)
  })
  completedLevelDiv.appendChild(nextLevelButton);
};


module.exports = FormView;
