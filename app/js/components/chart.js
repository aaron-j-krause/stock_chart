import React          from 'react';
import { LineChart }  from 'rd3';

const Chart = ({stockData, isFetching, fetchError}) => {
  if (isFetching || fetchError) {
    let classes = `filler-div ${isFetching && !fetchError ? 'spinner' :''}`;
    let errorMessage = fetchError ? <h2>Error retrieving stocks</h2> : '';
    return (<div className={classes}>
        {errorMessage}
      </div>);
  }

  return (<LineChart data={stockData}
    domain={{x:[stockData.xMax, stockData.xMin],
      y:[stockData.yMin, stockData.yMax]}}
    viewBoxObject={{
      x:0,
      y:0,
      width: 800,
      height: 500
    }}

    height={500}
    width={800}
  />);
};

export default Chart;
