const periodicTableFormatting = (data) => {
  return data.map((card) => {
    return {
      answer: card.name,
      clue: card.symbol,
      question: 'Which element is this?',
      gameLevel: 1
    };
  });
};

const countryCapitalsFormatting = (data) => {
  return data.map((card) => {
    return {
      answer: card.capital,
      clue: card.name,
      question: `What is the name of this country's capital city?`,
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
  }
};


module.exports = ApiDataHandler;
