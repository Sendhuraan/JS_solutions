import { SET_FILTER } from '../constants/action-types';
import { SHOW_ALL } from '../constants/filter-types';

function filterReducer(state = SHOW_ALL, action) {

	switch(action.type) {

		case SET_FILTER: {
			return applySetFilter(state, action);
		}

		default: {
			return state;
		}

	}

}

function applySetFilter(state, action) {
	return action.payload.filter;
}

export default filterReducer;
