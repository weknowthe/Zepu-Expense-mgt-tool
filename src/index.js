import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import App from './containers/App/index.js'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// import React from 'react'
// import { Provider } from 'react-redux'
// import ReactDOM from 'react-dom'
// import {BrowserRouter, Route, Switch } from 'react-router-dom'
// import App from './containers/App'
// import registerServiceWorker from './registerServiceWorker';
// const target = document.querySelector('#root');

// ReactDOM.render(
  
//           <Route path="/" component={App} />,
//   target
// );
// registerServiceWorker();
