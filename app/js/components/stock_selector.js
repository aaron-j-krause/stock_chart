import React from 'react';

const StockSelector = ({getStocks, companies, startDate, endDate}) => {
  return (
    <select onChange={(e) => {
      getStocks(e.target.value, startDate, endDate);
    }}>
      {companies.map( (company, index) => (
        <option key={index} value={company.symbol}>{company.name}</option>
        ))}
    </select>
  );};

export default StockSelector;
