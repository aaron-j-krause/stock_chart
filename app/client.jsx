import React    from 'react';
import ReactDom from 'react-dom';
import request  from 'superagent';
import keys     from '../keys';
import d3       from 'd3';

const arr = [
  {date: 0, close: 12},
  {date: 1, close: 24},
  {date: 2, close: 20},
  {date: 3, close: 1},
  {date: 4, close: 3},
  {date: 5, close: 7},
  {date: 6, close: 19}
];

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let svg = d3.select('.chart');
    let data = this.props.stockData;
    let x = d3.scale.linear().range([1000, 0]).domain([0, data.xMax]);
    let y = d3.scale.linear().range([300, 0]).domain([data.yMin, data.yMax]);

    svg.selectAll('dot')
      .data(data)
      .enter().append('circle')
      .attr('r', 2)
      .attr('cx', function(d) { 
        console.log(typeof d.date, d.date);
        return x(d.date);
      })
      .attr('cy', function(d) {
        console.log('YYYYY', typeof d.close);
        return y(d.close); 
      });  
  }

  render() {


    return (<svg className="chart" width="1000px" height="300px"></svg>);
  }
}

class ImageView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {images, message} = this.props;
    let img = images && <img src={images.epic}/>;
    return (<div>
              <h2>{message}</h2>
              {img}
            </div>);
  }
}

class ControllerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      message: 'hello'
    };
  }

  render() {
    let chart = this.state.stockData && <Chart stockData={this.state.stockData}/>;
    return (<main>
              <h1>NO FIRE ONLY SMOKE</h1>
              <ImageView message={this.state.message} images={this.state.images}/>
              {chart}
            </main>);
  }

  componentDidMount() {
    request('http://uifaces.com/api/v1/random')
      .then((res) => {
        let body = JSON.parse(res.text);

        this.setState({images: body.image_urls});
      }, (err) => console.log(err));

    // request('https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?api_key=' + keys.API_KEY)
    //   .then((res) => {
    //     let stockData = parseData(res.body.dataset.data);

    //     this.setState({stockData});
    //     console.log(this.state);
    //   }, (err) => console.log(err));
    var url = 'http://query.yahooapis.com/v1/public/yql?';
    var startDate = '2016-01-01';
    var endDate = '2016-04-08';
    var data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("AAPL") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
    request(url + 'q=' + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json")
      .then((response) => {
        console.log('YAAAAH')
        console.log(response);
        let stockData = parseData(response.body.query.results.quote);

        this.setState({stockData});
      }, (err) => console.log('YAAAAH', err));
  }
}




ReactDom.render(<ControllerView/>, document.getElementById('controller-view'));

// function parseData(dataSet) {
//   let data    = [];
//   let highest = 0;
//   let lowest  = dataSet[0][4];

//   dataSet = dataSet;

//   dataSet.forEach((e, i)=> {
//     if (e[4] > highest) highest = e[4];
//     if (e[4] < lowest) {
//       console.log(lowest);
//       lowest = e[4];
//     }
//     data.push({date: i, close:e[4]});
//   });

//   data.yMax = highest;
//   data.yMin = lowest;
//   data.xMax = dataSet.length;

//   return data;
// }

function parseData(dataSet) {
  let data    = [];
  let highest = 0;
  let lowest  = dataSet[0].Adj_Close;

  dataSet = dataSet;

  dataSet.forEach((e, i)=> {
    if (e.Adj_Close > highest) highest = e.Adj_Close;
    if (e.Adj_Close < lowest) {
      // console.log(lowest);
      lowest = e.Adj_Close;
    }
    data.push({date: i, close:e.Adj_Close});
  });

  data.yMax = highest + 10;
  data.yMin = lowest - 10;
  data.xMax = dataSet.length;

  return data;
}


