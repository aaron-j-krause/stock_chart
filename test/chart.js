import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Chart from '../app/js/components/chart';

describe('<Chart/>', () => {
  it('should render a chart', () => {
    let component;
    let renderer = TestUtils.createRenderer();
    let props = {
      stockData: ['test'],
      isFetching: false,
      fetchError: false
    };

    renderer.render((<Chart {...props}/>));
    component = renderer.getRenderOutput();
    expect(component.type.displayName).to.eql('LineChart');
    expect(component.props.data[0]).to.eql('test');
  });

  it('should render an error on error', () => {
    let component;
    let renderer = TestUtils.createRenderer();
    let props = {
      stockData: ['test'],
      isFetching: false,
      fetchError: true
    };

    renderer.render((<Chart {...props}/>));
    component = renderer.getRenderOutput();

    expect(component.type).to.eql('div');
    expect(component.props.className).to.eql('filler-div ');
    expect(component.props.children.type).to.eql('h2');
    expect(component.props.children.props.children).to.eql('Error retrieving stocks');
  });

  it('should render a spinner on fetch', () => {
    let component;
    let renderer = TestUtils.createRenderer();
    let props = {
      stockData: ['test'],
      isFetching: true,
      fetchError: false
    };

    renderer.render((<Chart {...props}/>));
    component = renderer.getRenderOutput();

    expect(component.type).to.eql('div');
    expect(component.props.className).to.eql('filler-div spinner');
  });
});
