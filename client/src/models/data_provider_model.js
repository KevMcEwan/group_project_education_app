const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');


const DataProvider = function () {
  this.cards = [];
};


DataProvider.prototype.bindEvents = function () {
  PubSub.subscribe('Data:db-data-ready-to-check-against-API', (evt) => {
    // THIS CAN BE DELETED???? PubSub.publish('Data:data-ready', this.cards);
    this.getAPIDataIfNeeded();
  });
  PubSub.subscribe('Data:data-grabbed-from-api', (evt) => {
    // console.dir("data is ready ", evt);
    PubSub.publish('Data:data-ready', this.cards);
  });
};


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
    })
    .then((cards) => PubSub.publish('Data:db-data-ready-to-check-against-API', cards))
};


DataProvider.prototype.getAPIDataIfNeeded = function () {
  const requestHelper = new RequestHelper('https://raw.githubusercontent.com/andrejewski/periodic-table/master/data.json');
  requestHelper.getData()
  .then((cardsFromAPI) => {
    //if length of cards (from API) is same as the ones already in DB, do nothing
    console.log("in API:", cardsFromAPI.length, 'in DB',this.cards.length );
    if (cardsFromAPI.length > this.cards.length ) {
      this.createCardsAndAddThemToDB(cardsFromAPI);
    } else {
      PubSub.publish('Data:data-grabbed-from-api', cardsFromAPI);
    };
  });
};

DataProvider.prototype.createCardsAndAddThemToDB = function (cardsFromAPI) {
  //TODO: Extension: remove all from db
  const requestHelper = new RequestHelper('http://localhost:3000/api/card-pack');
  cardsFromAPI.forEach((card) => {
    const newCard = {
      answer: card.name,
      clue: card.symbol,
      // atomicNumber: card.atomicNumber,
      // colour: card.cpkHexColor,
      // group: card.groupBlock,
      gameLevel: 1
    };
    requestHelper.post(newCard)
  });
  PubSub.publish('Data:data-grabbed-from-api', cardsFromAPI);
};


module.exports = DataProvider;
