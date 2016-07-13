import React        from 'react';
import { connect }  from 'react-redux';

let Header = ({stock}) => (
  <h1>Adjusted Close for {stock}</h1>
  );

const mapStateToProps = (state) => {
  return {
    stock: state.stock
  };
};

Header = connect(mapStateToProps, null)(Header);

export default Header;