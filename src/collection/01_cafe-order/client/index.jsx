import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './components/App';

var renderDiv = document.createElement('div');
document.body.appendChild(renderDiv);

ReactDOM.render(
		<App />,
		renderDiv
	);
