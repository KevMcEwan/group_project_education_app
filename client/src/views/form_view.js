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
  this.element.innerHTML = '';
  const elementSymbolTitle = document.createElement('h1');
  elementSymbolTitle.setAttribute('id', 'element-symbol');
  elementSymbolTitle.textContent = this.currentCard.symbol;
  this.element.appendChild(elementSymbolTitle);

  const answerForm = document.createElement('form');
  answerForm.classList.add('name-input');
  this.element.appendChild(answerForm);

  const inputTextField = document.createElement('input');
  inputTextField.setAttribute('type', 'text');
  inputTextField.setAttribute('id', 'textInputFieldID');
  inputTextField.setAttribute('name', 'textInputField');
  inputTextField.setAttribute('autofocus', 'autofocus');
  inputTextField.setAttribute('onfocus', 'this.select()');
  answerForm.appendChild(inputTextField);

  const inputTextFieldLabel = document.createElement('label');
  inputTextFieldLabel.setAttribute('for', 'textInputField');
  inputTextFieldLabel.textContent = 'Which element is this?';
  answerForm.appendChild(inputTextFieldLabel);

  const answerSubmitButton = document.createElement('input');
  answerSubmitButton.classList.add('btn-answer-typed');
  answerSubmitButton.setAttribute('type', 'submit');
  answerSubmitButton.setAttribute('value', 'Submit');
  answerForm.appendChild(answerSubmitButton);


  PubSub.publish('FormView:current-card', this.currentCard);
  console.log('FormView has this current card', this.currentCard);
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
