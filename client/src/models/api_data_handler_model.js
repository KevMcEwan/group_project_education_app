const periodicTableFormatting = (data) => {
  return data.map((card) => {
    return {
      answer: card.name,
      clue: card.symbol,
      gameLevel: 1
    };
  });
};

const countryCapitalsFormatting = (data) => {
  return data.map((card) => {
    return {
      answer: card.capital,
      clue: card.name,
      gameLevel: 1
    };
  });
};



const ApiDataHandler = {
  periodicTable: {
    url: 'https://raw.githubusercontent.com/andrejewski/periodic-table/master/data.json',
    mapAPIDataToCards: periodicTableFormatting
  },
  countryCapitals: {
    url: 'https://restcountries.eu/rest/v2/all',
    mapAPIDataToCards: countryCapitalsFormatting
  };
};


module.exports = ApiDataHandler;
