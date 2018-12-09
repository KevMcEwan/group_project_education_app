const Cards = require('./models/cards_model.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  const cardPack = 'http://localhost:3000/api/card-pack'
  const cards = new Cards(cardPack);
  cards.getData();
});
