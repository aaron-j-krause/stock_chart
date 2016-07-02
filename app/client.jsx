import React    from 'react';
import ReactDom from 'react-dom';
import request  from 'superagent';
import {LineChart} from 'rd3';

class ControllerView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: null,
      message: 'hello',
      stock: 'AAPL'
    };
  }

  render() {
    let stockData = this.state.stockData;

    let chart = stockData &&
      (<LineChart data={stockData}
        domain={{x:[stockData.xMin, stockData.xMax],
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

    return (<main>
              <h1>Adjusted Close For {this.state.stock}</h1>
              <ImageView message={this.state.message} images={this.state.images}/>
              {chart}
               <select onChange={this.newStock.bind(this)}>
                <option value="AAPL">Apple</option>
                <option value="GOOGL">Google</option>
                <option value="FB">Facebook</option>
                <option value="AMZN">Amazon</option>
              </select> 
            </main>);
  }

  newStock(e) {
    this.setState({stock: e.target.value}, this.getStocks);
  }

  getStocks() {
    let stock = this.state.stock;
    let url = 'http://query.yahooapis.com/v1/public/yql?';
    let startDate = '2016-01-01';
    let endDate = '2016-04-08';
    let data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("' + stock + '") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
    request(url + 'q=' + data + '&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json')
      .then((response) => {
        let stockData = parseData(response.body.query.results.quote);

        this.setState({stockData});
      }, (err) => console.log(err));
  }

  componentDidMount() {
    this.getStocks('AAPL');
    request('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.industry%20where%20id%20in%20(select%20industry.id%20from%20yahoo.finance.sectors)&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
      .then(res => {
        console.log('OOOTHTHTHER', res);
      }, err => console.log('ASIDHKLASDFHS', err));
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


