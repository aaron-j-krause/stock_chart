import { expect }     from 'chai';
import React          from 'react';
import TestUtils      from 'react-addons-test-utils';
import StockSelector  from '../app/js/components/stock_selector';

describe('Stock Selector', () => {
  let component;
  beforeEach(() => {
    let renderer = TestUtils.createRenderer();
    let props = {
      getStocks: () => {},
      companies: [{name: 'Test', symbol: 'TSST'}],
      startDate: new Date(),
      endDate: new Date()
    };

    renderer.render((<StockSelector {...props}/>));
    component = renderer.getRenderOutput();
  });

  it('should render correctly', () => {
    let testOption = component.props.children[0];

    expect(component.type).to.eql('select');
    expect(component.props.children.length).to.eql(1);
    expect(testOption.props.value).to.eql('TSST');
  });
  //might be best to bring in spies
  it('should send a test value by default');
});
