const DataProvider = require('./models/data_provider_model.js');
const Game = require('./models/game_model.js');
const FormView = require('./views/form_view.js');
const IncorrectCardView = require('./views/incorrect_card_view.js');
const PubSub = require('./helpers/pub_sub.js');
const ApiDataHandler = require('./models/api_data_handler_model.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const gameStartForm = document.querySelector('#nav-contents');

  gameStartForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const gameTopicSelected = evt.target.subjectchoice.value;
    console.dir(evt.target.subjectchoice.value);
    PubSub.publish('App:Game-topic-selection', gameTopicSelected);
  });

  const game = new Game();
  game.bindEvents();

  PubSub.subscribe('Game:cards-ready', (evt) => {
      const lowestLevel = game.lowestGameLevelOnCards();
      game.getLatestLevelCards(lowestLevel);
      const cardInPlayDiv = document.querySelector('#current');
      const randomCard = game.getRandomCard();
      const formView = new FormView(cardInPlayDiv, randomCard);
      formView.bindEvents();
      formView.render();
      const incorrectCardDiv = document.querySelector('#incorrect');
      const incorrectCardView = new IncorrectCardView(incorrectCardDiv);
      incorrectCardView.bindEvents();
  });


  PubSub.subscribe('FormView:start-next-level', (evt) => {
    const selectedApiDataHandler = ApiDataHandler[game.selectedGameTopic];
    game.getCards(selectedApiDataHandler);
  })
});
