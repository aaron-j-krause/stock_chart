import { expect } from 'chai';
import stocksApp from '../app/js/reducers'


describe('reducer tests', () => {
  it('initial state', () => {
    //pass undefined to trigger default argument
    expect(stocksApp(undefined, {})).to.have.property('selectedStockName');
  });

  it('change stock', () => {
    let testState = stocksApp({}, {
      type: 'CHANGE_STOCK',
      stock: 'test'
    });

    expect(testState.stock).to.eql('test');
  });

  it('update stock', () => {
    let testState = stocksApp({}, {
      type: 'UPDATE_STOCK',
      stockData: [{name: 'company', symbol:'symbol'}]
    });

    expect(testState.stockData[0].name).to.eql('company');
  });
});
