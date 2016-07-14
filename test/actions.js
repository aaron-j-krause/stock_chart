import { expect } from 'chai';
import { changeStock,
         updateStocks,
         getStocks} from '../app/js/actions';

import superNock from 'superagent-nock';
import request from 'superagent';

const nock = require('nock');

describe('Action Test', () => {
  it('change stock', () => {
    let testAction = changeStock('test');
    expect(testAction.stock).to.eql('test');
    expect(testAction.type).to.eql('CHANGE_STOCK');
  });

  it('update stocks', () => {
    let testAction = updateStocks('test');
    expect(testAction.stockData).to.eql('test');
    expect(testAction.type).to.eql('UPDATE_STOCK')
  });

  it('get stocks');
});
