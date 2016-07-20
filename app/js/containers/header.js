import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';

let Header = ({stockName}) => (
  <header>
    <h1 style={{
      fontSize: (() => {
        if (stockName.length > 30) return '45px';
        if (stockName.length > 50) return '35px';
      })()
    }}>Adjusted Close for {stockName}</h1>
  </header>
);

const mapStateToProps = (state) => {
  return {
    stockName: state.selectedStockName
  };
};

Header.propTypes = {
  stockName: PropTypes.string.isRequired
};

Header = connect(mapStateToProps, null)(Header);

export default Header;
