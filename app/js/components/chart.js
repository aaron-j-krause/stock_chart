import React          from 'react';
import { LineChart }  from 'rd3';

const Chart = ({stockData, isFetching}) => {
  if (isFetching) {
    return (<div className="spinner">
      </div>)
  }
  return (<LineChart data={stockData}
    domain={{x:[stockData.xMax, stockData.xMin],
      y:[stockData.yMin, stockData.yMax]}}
    viewBoxObject={{
      x:0,
      y:0,
      width: 1000,
      height: 500
    }}

    height={500}
    width={1000}
  />)
};

export default Chart;
