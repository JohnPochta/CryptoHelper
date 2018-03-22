import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import MainPage from './containers/MainPage.js';
import WorkSpace from './containers/WorkSpace.js';
import Manager from './containers/Manager.js';
import Analizator from './containers/Analizator.js';
import Homepage from './containers/Homepage.js';
import {createStore} from 'redux';
import reducer from './reducers';
import './stylesheets/index.css';


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
	<Router>
		<Provider store={store}>
			<div>
				<div>
				    <Route exact path = "/" component = {MainPage} />
				    <Route exact path = "/workspace" component = {WorkSpace} />
				    <Route exact path = "/manager" component = {Manager} />
				    <Route exact path = "/analizator" component = {Analizator} />
				    <Route exact path = "/homepage" component = {Homepage} />
			    </div>
			</div>
		</Provider>
	</Router>, 
	document.getElementById('root')
);
