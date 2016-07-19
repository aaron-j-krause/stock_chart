import request from 'superagent';

//pure action generators

export const changeStock = (stock) => {
  return {type: 'CHANGE_STOCK', stock};
};

export const updateStocks = (stockData) => {
  return {type: 'UPDATE_STOCK', stockData};
};

export const setStartDate = (date) => {
  return {type: 'SET_START_DATE', date};
};

export const setEndDate = (date) => {
  return {type: 'SET_END_DATE', date};
};

export const requestStocks = () => {
  return {type: 'REQUEST_STOCKS'};
};

export const updateCompanies = (companies) => {
  return {
    type: 'UPDATE_COMPANIES',
    companies
  };
};

export const requestStocksError = () => {
  return {
    type: 'REQUEST_STOCKS_ERROR'
  };
};

//thunk generators

export const getStocks = () => {
  return (dispatch, getState) => {
    let startDate = getState().startDate;
    let endDate = getState().endDate;
    let stock = getState().selectedStockSymbol;
    dispatch(requestStocks());

    let url = 'http://query.yahooapis.com/v1/public/yql?';

    let data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("'
        + stock + '") and startDate = "'
        + startDate + '" and endDate = "'
        + endDate + '"');

    let fullUrl = url + 'q=' + data + '&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';

    request(fullUrl)
      .then(res => {
        if (res.body.query.results === null) throw new Error('request stocks error');
        return parseData(res.body.query.results.quote);
      })
      .then(data => dispatch(updateStocks(data)))
      .catch(() => dispatch(requestStocksError()));
  };

  //parses data for rd3 chart
  function parseData(dataSet) {
    let data    = [];
    let highest = Number(dataSet[0].Adj_Close);
    let lowest  = Number(dataSet[0].Adj_Close);

    dataSet = dataSet;

    dataSet.forEach((e)=> {
      e.Adj_Close = Number(e.Adj_Close);
      if (e.Adj_Close > highest) highest = e.Adj_Close;
      if (e.Adj_Close < lowest) {

        lowest = e.Adj_Close;
      }

      data.push({x: new Date(e.Date), y:e.Adj_Close});
    });

    var lineData = [
      {
        name: 'series1',
        values: data

      }];
    lineData.yMax = highest;
    lineData.yMin = lowest;
    lineData.xMin = new Date(dataSet[0].Date);
    lineData.xMax = new Date(dataSet[dataSet.length - 1].Date);

    return lineData;
  }
};

export const getCompanies = () => {
  return (dispatch) => {
    request('http://localhost:3000/stocks')
      .then(res => JSON.parse(res.body))
      .then(data => dispatch(updateCompanies(data.companies)))
      .catch(err => console.log(err));
  };
};

