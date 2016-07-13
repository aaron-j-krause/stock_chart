import React from 'react';

const StockChanger = ({onGetStocks}) => (
    <select onChange={(e) => {
      onGetStocks(e.target.value);
    }}>
      <option value="AAPL">Apple</option>
      <option value="GOOGL">Google</option>
      <option value="FB">Facebook</option>
      <option value="AMZN">Amazon</option>
    </select>
  );

export default StockChanger;