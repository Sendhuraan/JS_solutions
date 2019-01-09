import React from 'react';

class Greeting extends React.Component 
{
	render() {
		return <h1 ref='node'>Hello, {this.props.name}</h1>;
	}
}

export default Greeting;