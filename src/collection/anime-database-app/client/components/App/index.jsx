import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SearchPage from '../SearchPage';
import BookDetailPage from '../BookDetailPage';

import './index.css';

function NoMatchRoute() {
	return (
		<div>404 Page</div>
	);
}

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact component={SearchPage} />
				<Route path='/book/:bookId' exact component={BookDetailPage} />
				<Route component={NoMatchRoute} />
			</Switch>
		</Router>
	);
}

export default App;
