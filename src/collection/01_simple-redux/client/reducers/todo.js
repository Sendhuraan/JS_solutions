import { ADD_TODO, TOGGLE_TODO } from '../constants/action-types';

function todoReducer(state = [], action) {

	switch(action.type) {

		case ADD_TODO: {
			return applyAddTodo(state, action);
		}

		case TOGGLE_TODO: {
			return applyToggleTodo(state, action);
		}

		default: {
			return state;
		}

	}

}

function applyAddTodo(state, action) {
	const newTodo = Object.assign({}, action.payload, { completed: false });
	return state.concat(newTodo);
}

function applyToggleTodo(state, action) {

	const newState = state.map(function(todo) {

		if(todo.id === action.payload.id) {
			return Object.assign({}, todo, { completed: !todo.completed });
		}
		else {
			return todo;
		}
		
	});

	return newState;
}

export default todoReducer;
