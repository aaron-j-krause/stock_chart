import { connect } from 'react-redux';
import StockChanger from '../components/stock_changer';
import { changeStock } from '../actions';

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStockChange: (stock) =>  {
      dispatch(changeStock(stock));
    }
  };
};

const ChangeStock = connect(mapStateToProps, mapDispatchToProps)(StockChanger);

export default ChangeStock;