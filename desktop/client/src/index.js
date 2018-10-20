import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import reducers from './app/reducers'
import axios from 'axios';
import { Route, Router, Redirect, Switch } from 'react-router';
import { persistor, store } from './configureStore';
import { PersistGate } from 'redux-persist/lib/integration/react'
import createBrowserHistory from 'history/createBrowserHistory'

import './app/styles/index.css';

import Dashboard from './app/scenes/Dashboard';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'https://www.freefood.org';

export const history = createBrowserHistory();

ReactDOM.render((
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  </PersistGate>
), document.getElementById('root'));

registerServiceWorker();
