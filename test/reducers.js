import { expect } from 'chai';
import stocksApp from '../app/js/reducers';

describe('Reducers', () => {
  it('initial state', () => {
    //pass undefined to trigger default argument
    expect(stocksApp(undefined, {})).to.have.property('selectedStockName');
  });

  it('change stock', () => {
    let testInitialState = {
      symbolMap: {'TSST': 'test'}
    };
    let testState = stocksApp(testInitialState, {
      type: 'CHANGE_STOCK',
      stock: 'TSST'
    });

    expect(testState.selectedStockSymbol).to.eql('TSST');
    expect(testState.selectedStockName).to.eql('test');
  });

  it('update stock', () => {
    let testState = stocksApp({}, {
      type: 'UPDATE_STOCK',
      stockData: [{name: 'company', symbol:'symbol'}]
    });

    expect(testState.stockData[0].name).to.eql('company');
  });

  it('set start date', () => {
    let testState = stocksApp({}, {
      type: 'SET_START_DATE',
      date: 'test date'
    });

    expect(testState.startDate).to.eql('test date');
  });

  it('set end date', () => {
    let testState = stocksApp({}, {
      type: 'SET_END_DATE',
      date: 'test date'
    });

    expect(testState.endDate).to.eql('test date');
  });

  it('update companies', () => {
    let testState = stocksApp({}, {
      type: 'UPDATE_COMPANIES',
      companies: [{name: 'test', symbol:'TSST'}]
    });

    expect(testState.symbolMap.TSST).to.eql('test');
  });

  it('request stocks', () => {
    let testState = stocksApp({}, {
      type: 'REQUEST_STOCKS'
    });

    expect(testState.isFetching).to.eql(true);
    expect(testState.fetchError).to.eql(false);
  });

  it('request stocks error', () => {
    let testState = stocksApp({}, {
      type: 'REQUEST_STOCKS_ERROR'
    });

    expect(testState.fetchError).to.eql(true);
  });
});
