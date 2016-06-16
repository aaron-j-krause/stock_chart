import React    from 'react';
import ReactDom from 'react-dom';
import request  from 'superagent';
import keys     from '../keys';

class ImageView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let img = this.props.images && <img src={this.props.images.epic}/>;
    return (<div>
              <h2>{this.props.message}</h2>
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
    return (<main>
              <h1>NO FIRE ONLY SMOKE</h1>
              <ImageView message={this.state.message} images={this.state.images}/>
            </main>);
  }

  componentDidMount() {
    request('http://uifaces.com/api/v1/random')
      .then((res) => {
        let body = JSON.parse(res.text);

        this.setState({images: body.image_urls});
      }, (err) => console.log(err));

    request('https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?api_key=' + keys.API_KEY)
      .then((res) => {
        let stockData = parseData(res.body.dataset.data);
        this.setState({stockData});
      }, (err) => console.log(err));
  }
}




ReactDom.render(<ControllerView/>, document.getElementById('controller-view'));

function parseData(dataSet) {
  let data = [];
  dataSet.forEach((e)=> {
    data.push({date: e[0], close:e[4]});
  });
  return data;
}
