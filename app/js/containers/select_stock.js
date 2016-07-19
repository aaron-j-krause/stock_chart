import { connect } from 'react-redux';
import StockSelector from '../components/stock_selector';
import { changeStock, getStocks } from '../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    getStocks: (stock, start, end) => {
      dispatch(getStocks(stock, start, end));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    companies: state.companies,
    startDate: state.startDate,
    endDate: state.endDate
  };
};

const SelectStock = connect(mapStateToProps, mapDispatchToProps)(StockSelector);

export default SelectStock;
