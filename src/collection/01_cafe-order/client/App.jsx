import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

import OrderCounter from './components/order-counter.jsx';
import OrderForm from './components/order-form.jsx';
import OrdersList from './components/orders-list.jsx';

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
