import React from 'react';

const StockChanger = ({getStocks, companies}) => {
  return (
    <select onChange={(e) => {
      getStocks(e.target.value);
    }}>
      {companies.map( (company, index) => (
        <option key={index} value={company.symbol}>{company.name}</option>
        ))}
    </select>
  )};

export default StockChanger;
