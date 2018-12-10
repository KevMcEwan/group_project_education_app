const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');


const DataProvider = function (){
  this.cards = [];
};



//TODO bind here:

//pubsub subscribe Data:drom-db
    this.getAPIDataIfNeeded();
// console.log("in DB:", this.cards);


//pubsub subscribe Data:from-api-is-ready


DataProvider.prototype.getData = function () {
  this.getCardsFromDB();
  // console.log("in DB:", this.cards);
};


DataProvider.prototype.getCardsFromDB = function () {
  const requestHelper = new RequestHelper('http://localhost:3000/api/card-pack');
  requestHelper.getData()
  .then((cards) => {
    cards.forEach((card) => {
      this.cards.push(card);
    })
    //pubsub publish Data:drom-db
  });
};


DataProvider.prototype.getAPIDataIfNeeded = function () {
  const requestHelper = new RequestHelper('https://raw.githubusercontent.com/andrejewski/periodic-table/master/data.json');
  requestHelper.getData()
  .then((cardsFromAPI) => {
    //if length of cards (from API) is same as the ones already in DB, do nothing
    console.log("in API:", cardsFromAPI.length, ' in DB',this.cards.length );
    if (cardsFromAPI.length !== this.cards.length ) {
      this.createCardsAndAddThemToDB(cardsFromAPI);
    }else{
      //pubsub publish Data:from-api-is-ready
    }
  })
};

DataProvider.prototype.createCardsAndAddThemToDB = function (cards) {
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

  //pubsub publish Data:from-api-is-ready

};


module.exports = DataProvider;
