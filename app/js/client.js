import React    from 'react';
import ReactDom from 'react-dom';
import request  from 'superagent';

import { LineChart }      from 'rd3';
import ChangeStock        from './containers/change_stock';
import Header             from './containers/header';
import RenderChart        from './containers/render_chart'

import { createStore,
         applyMiddleware }  from 'redux';
import { Provider,
         connect }          from 'react-redux';
import thunkMiddleware      from 'redux-thunk';
import stocksApp            from './reducers';
import { getStocks,
         getCompanies }     from './actions'

const store = createStore(stocksApp, applyMiddleware(thunkMiddleware));

store.dispatch(getStocks('AAPL'));
store.dispatch(getCompanies());

let MainView = () => (
    <main className="home">
      <Header/>
      <RenderChart/>
      <ChangeStock/>
    </main>);

ReactDom.render(
  <Provider store={store}>
    <MainView/>
  </Provider>, document.getElementById('controller-view'));


