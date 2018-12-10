const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Cards = function (){
  this.url = 'http://localhost:3000/api/card-pack';
};

Cards.prototype.getAPIData = function () {
  const requestHelper1 = new RequestHelper('https://raw.githubusercontent.com/andrejewski/periodic-table/master/data.json');
  requestHelper1.getData()
  .then((cards) => {
    this.createCards(cards);
  })
};

Cards.prototype.createCards = function (cards) {
  const requestHelper = new RequestHelper('http://localhost:3000/api/card-pack');
  cards.forEach((card) => {
    const newCard = {
      name: card.name,
      symbol: card.symbol,
      atomicNumber: card.atomicNumber,
      colour: card.cpkHexColor,
      group: card.groupBlock,
      gameLevel: 1
    };
    requestHelper.post(newCard)
  });
};


module.exports = Cards;
