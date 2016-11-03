import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import makeRoutes from './routes'
import 'font-awesome/css/font-awesome.css'
import './app.css'
import App from './components/App/App'

const routes = makeRoutes();

const mountNode = document.querySelector('#app');
ReactDOM.render(
  <App history={browserHistory}
        routes={routes} />, mountNode);
