import React, { PropTypes } from 'react';
import DatePicker           from 'react-datepicker';
import moment               from 'moment';

const DateSelector = ({startDate, endDate, startChange, endChange}) => (
  <div>
    <DatePicker
      className="picker-input"
      onChange={startChange}
      selected={moment(startDate)}
      maxDate={moment(endDate).subtract(1, 'days')}
      minDate={moment('2000-01-01')}
      readOnly={true}
      filterDate={(d) => d.day() % 6 !== 0}
    />
    <DatePicker
      className="picker-input"
      onChange={endChange}
      selected={moment(endDate)}
      minDate={moment(startDate).add(1, 'days')}
      maxDate={moment()}
      readOnly={true}
      filterDate={(d) => d.day() % 6 !== 0}
    />
  </div>
  );

DateSelector.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  startChange: PropTypes.func.isRequired,
  endChange: PropTypes.func.isRequired
};

export default DateSelector;
