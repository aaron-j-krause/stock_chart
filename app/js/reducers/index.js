import moment from 'moment';

const initialState = {
  stock: 'AAPL',
  selectedStockName: 'Apple',
  selectedStockSymbol: 'AAPL',
  startDate: moment().format('YYYY-MM-01'),
  endDate: moment().format('YYYY-MM-DD'),
  isFetching: false,
  companies: [{name: 'Google', symbol: 'GOOGL'},
              {name: 'Apple',  symbol: 'AAPL'}],
  symbolMap: {
    'Google': 'GOOGL',
    'Apple': 'AAPL'
  }
};

const stocksApp = (state = initialState, action) => {
  // console.log(action, state);
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

  case 'SET_START_DATE':
    return Object.assign({}, state, {
      startDate: action.date
    });

  case 'SET_END_DATE':
    return Object.assign({}, state, {
      endDate: action.date
    });

  case 'UPDATE_COMPANIES':
    let symbolMap = {};

    action.companies.forEach(company => symbolMap[company.name] = company.symbol);
    return Object.assign({}, state, {
      companies: action.companies,
      symbolMap
    });
  }

  return state;
};

export default stocksApp;
