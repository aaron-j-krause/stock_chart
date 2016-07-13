import React    from 'react';
import ReactDom from 'react-dom';
import request  from 'superagent';

import { LineChart }      from 'rd3';
import { StockSelector }  from './components';
import ChangeStock        from './containers/change_stock';
import Header             from './containers/header';
import StockChanger       from './components/stock_changer';
import RenderChart        from './containers/render_chart'

import { createStore,
         applyMiddleware }  from 'redux';
import { Provider }         from 'react-redux';
import thunkMiddleware      from 'redux-thunk';
import stocksApp            from './reducers';
import { changeStock,
         getStocks }        from './actions';


import { connect }          from 'react-redux';

const store = createStore(stocksApp, applyMiddleware(thunkMiddleware));

store.dispatch(getStocks('AAPL'));

let MainView = () => (
    <main>
      <Header/>
      <RenderChart />
      <ChangeStock />
    </main>);

ReactDom.render(<Provider store={store}>
                  <MainView/>
                </Provider>, document.getElementById('controller-view'));


