import React from 'react';
import DateSelector from '../components/date_selector';
import { setStartDate,
         setEndDate} from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    startDate: state.startDate,
    endDate: state.endDate
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startChange: (date) => {
      dispatch(setStartDate(date.format('YYYY-MM-DD')));
    },

    endChange: (date) => {
      dispatch(setEndDate(date.format('YYYY-MM-DD')));
    }
  };
};

const DateForm = connect(mapStateToProps, mapDispatchToProps)(DateSelector);

export default DateForm;
