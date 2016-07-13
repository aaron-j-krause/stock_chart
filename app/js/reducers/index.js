const initialState = {
  stock: 'AAPL',
  selectedStockName: 'Apple',
  selectedStockSymbol: 'AAPL',
  isFetching: false,
  companies: [{name: 'Google', symbol: 'GOOGL'},
              {name: 'Apple',  symbol: 'AAPL'}],
  symbolMap: {
    'Google': 'GOOGL',
    'Apple': 'AAPL'
  }
};

const stocksApp = (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE_STOCK':
    return Object.assign({}, state, {
      stock: action.stock,
      isFetching: true
    });

  case 'UPDATE_STOCK':
    return Object.assign({}, state, {
      stockData: action.stockData,
      isFetching: false
    });

  case 'UPDATE_COMPANIES':
    let symbolMap = {};

    action.companies.forEach(company => symbolMap[company.name] = company.symbol)
    return Object.assign({}, state, {
      companies: action.companies,
      symbolMap
    });
  }

  return state;
};

export default stocksApp;
