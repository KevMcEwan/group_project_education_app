const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');


const Game = function() {
  this.cards = [];
};

Game.prototype.getCards = function () {
  const requestHelper = new RequestHelper('http://localhost:3000/api/card-pack');
  requestHelper.getData()
  .then((cards) => {cards.forEach((card) => {
    this.cards.push(card);
  })
});
  console.log(this.cards);
};


module.exports = Game;
