import { connect } from 'react-redux';
import StockSelector from '../components/stock_selector';
import { changeStock, getStocks } from '../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    getStocks: (stock) => {
      dispatch(getStocks(stock));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    companies: state.companies
  };
};

const SelectStock = connect(mapStateToProps, mapDispatchToProps)(StockSelector);

export default SelectStock;
