use card_game;
db.dropDatabase();
db.cards.insertMany([

{
    "name": "Helium",
    "symbol": "He",
    "atomicNumber": 2,
    "colour": "D9FFFF",
    "group": "noble gas",
    "gameLevel": 1
  },

  {
    "name": "Hydrogen",
    "symbol": "H",
    "atomicNumber": 1,
    "colour": "FFFFFF",
    "group": "nonmetal",
    "gameLevel": 1
  },

  {
    "name": "Lithium",
    "symbol": "Li",
    "atomicNumber": 3,
    "colour": "CC80FF",
    "group": "alkali metal",
    "gameLevel": 1
  },

  {
    "name": "Beryllium",
    "symbol": "Be",
    "atomicNumber": 4,
    "colour": "C2FF00",
    "group": "alkaline earth metal",
    "gameLevel": 1
  },

  {
    "name": "Boron",
    "symbol": "B",
    "atomicNumber": 5,
    "colour": "FFB5B5",
    "group": "metalloid",
    "gameLevel": 1
  }

]);
