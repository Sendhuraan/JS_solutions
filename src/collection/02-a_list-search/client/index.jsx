import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.jsx';

var renderDiv = document.createElement('div');
document.body.appendChild(renderDiv);

ReactDOM.render(
		<App />,
		renderDiv
	);
