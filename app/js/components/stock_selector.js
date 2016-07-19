import React from 'react';

const StockSelector = ({onChange, companies}) => {
  return (
    <select onChange={(e) => {
      console.log('CHANGE FIRED');
      onChange(e.target.value);
    }}>
      {companies.map( (company, index) => (
        <option key={index} value={company.symbol}>{company.name}</option>
        ))}
    </select>
  );};

export default StockSelector;
