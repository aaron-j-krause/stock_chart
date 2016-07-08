import React    from 'react';
import ReactDom from 'react-dom';
import request  from 'superagent';
import {LineChart} from 'rd3';
import {StockSelector} from './components';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import stocksApp from './reducers';
import ChangeStock from './containers/change_stock'


import StockChanger from './components/stock_changer';

import { changeStock } from './actions';


const store = createStore(stocksApp);

class ControllerView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stock: 'AAPL'
    };
  }

  newStock(e) {
    this.setState({stock: e.target.value}, this.getStocks);
  }

  getStocks() {
    let stock = this.state.stock;
    let url = 'http://query.yahooapis.com/v1/public/yql?';
    let date = new Date();
    let {year, day, month} = [date.getFullYear(), date.getDate(), date.getMonth()];

    let startDate = `${date.getFullYear()}-01-01`;
    let endDate = `${year}-${month}-${day}`;

    let data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("'
        + stock + '") and startDate = "'
        + startDate + '" and endDate = "'
        + endDate + '"');

    request(url + 'q=' + data + '&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json')
      .then((response) => {
        let stockData = parseData(response.body.query.results.quote);

        this.setState({stockData});
      }, (err) => console.log(err));
  }

  componentDidMount() {
    this.getStocks('AAPL');
  }

  render() {
    let stockData = this.state.stockData;

    let chart = stockData &&
      (<LineChart data={stockData}
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
      />);

    return (<Provider store={store}>
              <main>
                <h1>Adjusted Close For {this.state.stock}</h1>
                {chart}
                <StockSelector newStock={this.newStock.bind(this)}/>
                <ChangeStock />
                <input type="date" onChange={this.getDates}></input>
              </main>
            </Provider>);
  }
}




ReactDom.render(<ControllerView/>, document.getElementById('controller-view'));

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


