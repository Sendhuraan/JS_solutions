import { ajax } from 'rxjs/ajax';
import { map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { GET_TODOS } from '../constants/action-types';
import { setTodos } from '../actions/todo-actions';

const fetchTodosEpic = action$ =>
	action$.pipe(
		ofType(GET_TODOS),
		mergeMap(() =>
			ajax
				.getJSON('https://jsonplaceholder.typicode.com/todos')
				.pipe(map(response => setTodos(response)))
		)
	);

export { fetchTodosEpic };
