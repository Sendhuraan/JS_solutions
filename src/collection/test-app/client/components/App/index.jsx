/* eslint-disable */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'regenerator-runtime/runtime';

import Search from '../Search';
import BookDetailPage from '../BookDetailPage';
import AppContext from '../AppContext';

import './index.css';

function Header(props) {
	return (
	<React.Fragment>
		<div>I'm Header Component</div>
		<AppContext.Consumer>
			{(value) => {
				return (
					<li>{value.state.search}</li>
				)
			}}
		</AppContext.Consumer>
	</React.Fragment>
	);
}

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: 'jig'
		};

		this.changeSearchValue = this.changeSearchValue.bind(this);
	}

	changeSearchValue() {
		this.setState({
			search: 'jigu'
		});
	}

	render() {
		return (
			<AppContext.Provider
				value={{
					state: this.state,
					changeSearchValue: this.changeSearchValue
				}}
			>
				<Header />
				<Router>
					<Switch>
						<Route path='/' exact component={Search} />
						<Route path='/book/:bookId' exact component={BookDetailPage} />
					</Switch>
				</Router>
			</AppContext.Provider>
		);
	}
	
}

export default App;
