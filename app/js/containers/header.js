import React        from 'react';
import { connect }  from 'react-redux';

let Header = ({stock}) => (
  <header>
    <h1 style={{
      fontSize: (() => {
        if (stock.length > 30) return '45px';
        if (stock.length > 50) return '35px';
      })()
    }}>Adjusted Close for {stock}</h1>
  </header>
  );

const mapStateToProps = (state) => {
  return {
    stock: state.selectedStockName
  };
};

Header = connect(mapStateToProps, null)(Header);

export default Header;
