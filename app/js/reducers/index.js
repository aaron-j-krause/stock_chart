import moment from 'moment';

//TODO modularize with combine reducers
const initialState = {
  stock: 'AAPL',
  selectedStockName: 'Apple',
  selectedStockSymbol: 'AAPL',
  startDate: moment().format('YYYY-MM-01'),
  endDate: moment().format('YYYY-MM-DD'),
  isFetching: false,
  fetchError: false,
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
      selectedStockSymbol: action.stock,
      selectedStockName: state.symbolMap[action.stock],
      isFetching: true
    });

  case 'UPDATE_STOCK':
    return Object.assign({}, state, {
      stockData: action.stockData,
      isFetching: false,
      fetchError: false
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
    return Object.assign({}, state, {
      companies: action.companies,
      symbolMap: action.companies.reduce((map, company) => {
        map[company.symbol] = company.name;
        return map;
      }, {})
    });

  case 'REQUEST_STOCKS':
    return Object.assign({}, state, {
      isFetching: true,
      fetchError: false
    });

  case 'REQUEST_STOCKS_ERROR':
    return Object.assign({}, state, {
      fetchError: true
    });
  }

  return state;
};

export default stocksApp;
