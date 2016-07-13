import { connect } from 'react-redux';
import StockChanger from '../components/stock_changer';
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

const ChangeStock = connect(mapStateToProps, mapDispatchToProps)(StockChanger);

export default ChangeStock;
