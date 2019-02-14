import { combineReducers } from 'redux';

import todoReducer from './todo-reducer';
import filterReducer from './filter-reducer';

const rootReducer = combineReducers({
	todoState: todoReducer,
	filterState: filterReducer
});

export default rootReducer;
