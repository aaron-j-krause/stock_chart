const initialState = {
  stock: 'AAPL'
};

const stocksApp = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
  case 'CHANGE_STOCK':
    return Object.assign({}, state, {
      stock: action.stock
    });
  case 'UPDATE_STOCK':
    return Object.assign({}, state, {
      stockData: action.stockData
    });
  }
  return state;
};

export default stocksApp;