import { combineReducers } from 'redux';

import todoReducer from './todo';
import filterReducer from './filter';

const rootReducer = combineReducers({
	todoState: todoReducer,
	filterState: filterReducer
});

export default rootReducer;
