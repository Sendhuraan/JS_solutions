import React from 'react';
import ReactDOM from 'react-dom';
import SimpleComponent from './components/simple-component.js';

var renderDiv = document.createElement('div');
document.body.appendChild(renderDiv);

ReactDOM.render(
		<SimpleComponent name='Sendhuraan' />,
		renderDiv
	);