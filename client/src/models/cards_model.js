const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Cards = function (){
  // this.url = 'https://raw.githubusercontent.com/andrejewski/periodic-table/master/data.json';
  this.url = 'http://localhost:3000/api/card-pack';
  this.cards = [];
};

Cards.prototype.getAPIData = function () {
  const requestHelper1 = new RequestHelper('https://raw.githubusercontent.com/andrejewski/periodic-table/master/data.json');

  // const requestHelper2 = new RequestHelper('http://localhost:3000/api/card-pack');
  requestHelper1.getData()
  .then((cards) => {

    this.createCards(cards);
    // requestHelper2.post(this.cards);
    // console.log(this.cards);
  })

  // .catch(console.error);
};

// Cards.prototype.getDbData = function () {
//   const requestHelper = new RequestHelper('https://localhost:3000/api/card-pack');
//   // requestHelper.getDbData()
//   // .then((cards) => {
//   //   this.createCards(cards);
//   //   requestHelper.post(this.cards);
//   //   console.log(this.cards);
//   // })
//   // .catch(console.error);
// };

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

  // this.cards.push(newCard);


};







module.exports = Cards;
