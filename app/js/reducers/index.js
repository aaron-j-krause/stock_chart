const initialState = {
  stock: 'AAPL',
  isFetching: false
};

const stocksApp = (state = initialState, action) => {
  console.log(state, action);
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
  }
  return state;
};

export default stocksApp;