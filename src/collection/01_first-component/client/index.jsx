import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

var renderDiv = document.createElement('div');
document.body.appendChild(renderDiv);

ReactDOM.render(
		<App />,
		renderDiv
	);
