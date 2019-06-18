import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

function configureStore(initialState) {
	const middleware = [
		thunk
	];

	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(...middleware)
	);
}

export default configureStore;
