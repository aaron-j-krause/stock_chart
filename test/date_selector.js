import { expect }     from 'chai';
import React          from 'react';
import TestUtils      from 'react-addons-test-utils';
import DateSelector   from '../app/js/components/date_selector';

describe('<DateSelector/>', () => {
  let component;
  beforeEach(() => {
    let renderer = TestUtils.createRenderer();
    let props = {
      startDate: new Date().toString(),
      endDate: new Date().toString(),
      startChange: function(){},
      endChange: function(){}
    };

    renderer.render((<DateSelector {...props}/>));
    component = renderer.getRenderOutput();
  });

  it('should render correctly', () => {
    let children = component.props.children;

    expect(children[0].type.displayName).to.eql('DatePicker');
    expect(childrein[1].type.displayName).to.eql('DatePicker');
  });
});
