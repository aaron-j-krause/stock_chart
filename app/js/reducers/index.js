const initialState = {
  stock: 'AAPL'
};

const stocksApp = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
  case 'CHANGE_STOCK':
    return Object.assign({}, state, {
      stock: action.stock
    });
  }
  return state;
};

export default stocksApp;