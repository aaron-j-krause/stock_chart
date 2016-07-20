import { expect } from 'chai';
import * as actions from '../app/js/actions';

describe('Action Test', () => {
  it('change stock', () => {
    let testAction = actions.changeStock('test');

    expect(testAction.stock).to.eql('test');
    expect(testAction.type).to.eql('CHANGE_STOCK');
  });

  it('update stocks', () => {
    let testAction = actions.updateStocks('test');

    expect(testAction.stockData).to.eql('test');
    expect(testAction.type).to.eql('UPDATE_STOCK');
  });

  it('set start date', () => {
    let testAction = actions.setStartDate('test');

    expect(testAction.date).to.eql('test');
    expect(testAction.type).to.eql('SET_START_DATE');
  });

  it('set end date', () => {
    let testAction = actions.setEndDate('test');

    expect(testAction.date).to.eql('test');
    expect(testAction.type).to.eql('SET_END_DATE');
  });

  it('request stocks', () => {
    let testAction = actions.requestStocks();

    expect(testAction.type).to.eql('REQUEST_STOCKS');
  });

  it('update companies', () => {
    let testAction = actions.updateCompanies('test');

    expect(testAction.type).to.eql('UPDATE_COMPANIES');
    expect(testAction.companies).to.eql('test');
  });

  it('request stocks error', () => {
    let testAction = actions.requestStocksError();

    expect(testAction.type).to.eql('REQUEST_STOCKS_ERROR');
  });

  //need mock backend
  it('get stocks');
});
