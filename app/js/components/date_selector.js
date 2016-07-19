import React from 'react';
import DatePicker from 'react-datepicker';

const DateSelector = ({startDate, endDate, startChange, endChange}) => (
  <div>
    <DatePicker
      className="picker-input"
      onChange={startChange}
      placeholderText={startDate}
      readOnly={true}
    />
    <DatePicker
      className="picker-input"
      onChange={endChange}
      placeholderText={endDate}
      readOnly={true}
    />
  </div>
  );

export default DateSelector;