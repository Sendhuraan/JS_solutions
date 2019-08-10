import React from 'react';

class App extends React.Component {
	render() {
		return <h1 ref='node'>Hello, {this.props.name}</h1>;
	}
}

export default App;
