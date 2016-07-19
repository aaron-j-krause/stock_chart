import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const DateSelector = ({startDate, endDate, startChange, endChange}) => (
  <div>
    <DatePicker
      onChange={startChange}
      placeholderText={startDate}
    />
    <DatePicker
      onChange={endChange}
      placeholderText={endDate}
    />
  </div>
  );

export default DateSelector;