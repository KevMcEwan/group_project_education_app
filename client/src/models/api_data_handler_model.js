const periodicTableFormatting = (data) => {
  return data.map((card) => {
    return {
      answer: card.name,
      clue: card.symbol,
      gameLevel: 1
    };
  });
};


const ApiDataHandler = {
   periodicTable: {
    url: 'https://raw.githubusercontent.com/andrejewski/periodic-table/master/data.json',
    mapAPIDataToCards: periodicTableFormatting
  }
};


module.exports = ApiDataHandler;
