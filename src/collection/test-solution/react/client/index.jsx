import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/index.jsx';

import './index.css';

var renderDiv = document.createElement('div');
document.body.appendChild(renderDiv);

ReactDOM.render(
	<App name='Sendhuraan' />,
	renderDiv
);
