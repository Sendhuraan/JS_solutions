import store from './store';
import { doAddTodo, doToggleTodo } from './actions/todo-actions';
import { doSetFilter } from './actions/filter-actions';
import { SHOW_ALL, SHOW_COMPLETED_TASKS, SHOW_INCOMPLETE_TASKS } from './constants/filter-types';


const unsubscribe = store.subscribe(() => {
	console.log('store update, current state:');
	console.log(store.getState());
});

console.log('initial state:');
console.log(store.getState());

store.dispatch(doAddTodo('0', 'Learn Redux'));
store.dispatch(doAddTodo('1', 'Learn Mobx'));
store.dispatch(doToggleTodo('0'));

store.dispatch(doSetFilter(SHOW_COMPLETED_TASKS));
store.dispatch(doSetFilter(SHOW_INCOMPLETE_TASKS));

unsubscribe();
