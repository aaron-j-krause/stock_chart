import { connect } from 'react-redux';
import StockChanger from '../components/stock_changer';
import { changeStock, getStocks } from '../actions';

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStocks: (stock) => {
      dispatch(getStocks(stock));
    }
  };
};

const ChangeStock = connect(mapStateToProps, mapDispatchToProps)(StockChanger);

export default ChangeStock;