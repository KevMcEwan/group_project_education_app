const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Cards = function (dbUrl){
  this.apiUrl = 'https://raw.githubusercontent.com/andrejewski/periodic-table/master/data.json';
  this.dbUrl = dbUrl;
};

Cards.prototype.getData = function () {
  const requestHelper = new RequestHelper(this.apiUrl);
  requestHelper.get()
    .then((cards) => {
      console.log(cards);
      PubSub.publish('Cards:data-loaded', cards);
    })
    .catch(console.error);
};




module.exports = Cards;
