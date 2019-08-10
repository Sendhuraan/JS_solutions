import React, { Component } from 'react';

import './index.css';

import logo from '../../images/logo.svg';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<img className='App-logo' src={logo} alt='logo' />
					<h1 className='App-title'>First Component</h1>
				</header>
			</div>
		);
	}
}

export default App;
