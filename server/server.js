const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

MongoClient.connect('mongodb://testuser:testPASSword23@ds261078.mlab.com:61078/heroku_04qs6swp')
  .then((client) => {
    const db = client.db('heroku_04qs6swp');
    const cardCollection = db.collection('cards');
    const cardsRouter = createRouter(cardCollection)
    app.use('/api/heroku_04qs6swp', cardsRouter);
  })
  .catch(console.error);

  const port = process.env.PORT || 3000
  app.listen(port, function () { console.log(`Listening on port ${ port }`);
  });
