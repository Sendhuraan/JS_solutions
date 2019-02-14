import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../store';

import './index.css';

import OrderCounter from '../OrderCounter';
import OrderForm from '../OrderForm';
import OrdersList from '../OrdersList';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className='App'>
					<OrderForm />
					<hr />
					<OrderCounter />
					<OrdersList />
				</div>
			</Provider>
		);
	}
}

export default App;
