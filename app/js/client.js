import React                from 'react';
import ReactDom             from 'react-dom';
import { createStore,
         applyMiddleware }  from 'redux';
import { Provider }         from 'react-redux';

import SelectStock          from './containers/select_stock';
import Header               from './containers/header';
import RenderChart          from './containers/render_chart';
import DateForm             from './containers/date_form';

import thunkMiddleware      from 'redux-thunk';
import stocksApp            from './reducers';
import { getStocks,
         getCompanies }     from './actions';

const store = createStore(stocksApp, applyMiddleware(thunkMiddleware));

store.dispatch(getStocks('AAPL'));
store.dispatch(getCompanies());

let MainView = () => (
    <main className="home">
      <Header/>
      <RenderChart/>
      <SelectStock/>
      <DateForm />
    </main>);

ReactDom.render(
  <Provider store={store}>
    <MainView/>
  </Provider>, document.getElementById('controller-view'));


