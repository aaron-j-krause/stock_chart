import React    from 'react';
import ReactDom from 'react-dom';
import request  from 'superagent';
import keys     from '../keys';
import d3       from 'd3';

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let svg = d3.select('.chart');
    let data = this.props.stockData;
    // renderChart(svg, data);
    let x = d3.scale.linear().range([0,960]).domain([0, data.xMax]);
    let y = d3.scale.linear().range([260, 0]).domain([data.yMin, data.yMax]);
    let xAxis = d3.svg.axis()
                      .scale(x)
                      .orient('bottom');

    let yAxis = d3.svg.axis()
                      .scale(y)
                      .ticks(10)
                      .orient('left');

    svg.append('g')
        .attr('class', 'x axis')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(960, 0)')
        .call(yAxis);
   
  }

  render() {
    let svg = d3.select('.chart');
    let data = this.props.stockData;
    renderChart(svg, data);
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
    // this.newStock = this.newStock.bind(this);
    this.state = {
      images: null,
      message: 'hello',
      stock: 'AAPL'
    };
  }

  render() {
    let chart = this.state.stockData && 
      <Chart stockData={this.state.stockData}/>;
    return (<main>
              <h1>NO FIRE ONLY SMOKE</h1>
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
    console.log(e, e.target.value);
    this.setState({stock: e.target.value}, this.getStocks);
  }

  getStocks() {
    let stock = this.state.stock;
    let url = 'http://query.yahooapis.com/v1/public/yql?';
    let startDate = '2016-01-01';
    let endDate = '2016-04-08';
    let data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("' + stock + '") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
    request(url + 'q=' + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json")
      .then((response) => {
        console.log('YAAAAH');
        console.log(response);
        let stockData = parseData(response.body.query.results.quote);

        this.setState({stockData});
      }, (err) => console.log('YAAAAH', err));
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

function renderChart(svg, data) {
  let x = d3.scale.linear().range([960, 0]).domain([0, data.xMax]);
  let y = d3.scale.linear().range([260, 0]).domain([data.yMin, data.yMax]);

  let lineFunction = d3.svg.line()
                         .x(function(d) { return x(d.date); })
                         .y(function(d) { return y(d.close); })
                         .interpolate('linear');

  let boundPath = svg.selectAll('.chartline')
                    .data(data);

  let boundDots = svg.selectAll('.dot')
                      .data(data);



  boundPath.enter()
    .append('path')
    .attr('class', 'chartline')
    .attr('d', lineFunction(data))
    .attr('stroke', 'blue')
    .attr('stroke-width', 1)
    .attr('fill', 'none');

  boundPath.transition()
    .duration(1000)
    .attr('d', lineFunction(data));

  boundDots
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('r', 2)
    .attr('cx', function(d) { 
      return x(d.date);
    })
    .attr('cy', function(d) {
      return y(d.close); 
    });

  boundDots
    .transition()
    .duration(1000)
    .attr('cx', function(d) { 
      return x(d.date);
    })
    .attr('cy', function(d) {
      return y(d.close); 
    });
}


