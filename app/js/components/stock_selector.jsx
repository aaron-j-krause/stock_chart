import React from 'react';

class StockSelector extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (<select onChange={this.props.newStock}>
      <option value="AAPL">Apple</option>
      <option value="GOOGL">Google</option>
      <option value="FB">Facebook</option>
      <option value="AMZN">Amazon</option>
    </select>);
  }
}

module.exports = StockSelector;
