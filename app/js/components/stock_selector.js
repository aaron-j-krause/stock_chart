import React, { PropTypes } from 'react';

const StockSelector = ({onChange, companies}) => (
  <select onChange={e => {
    onChange(e.target.value);
  }}>
    {companies.map((company, index) => (
      <option key={index} value={company.symbol}>{company.name}</option>
      ))}
  </select>
);

StockSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  companies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired
  }).isRequired).isRequired
};

export default StockSelector;
