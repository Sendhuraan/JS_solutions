import { ADD_TODO, TOGGLE_TODO } from '../constants/action-types';

export const doAddTodo = (id, name) => {
	return {
		type: ADD_TODO,
		payload: {
			id,
			name
		}
	};
};

export const doToggleTodo = (id) => {
	return {
		type: TOGGLE_TODO,
		payload: {
			id
		}
	};
};
