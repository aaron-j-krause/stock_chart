import React from 'react';

const StockChanger = ({onStockChange}) => (
    <select onChange={(e) => {
      console.log(onStockChange);
      onStockChange(e.target.value);
    }}>
      <option value="AAPL">Apple</option>
      <option value="GOOGL">Google</option>
      <option value="FB">Facebook</option>
      <option value="AMZN">Amazon</option>
    </select>
  );

export default StockChanger;