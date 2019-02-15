import store from './store';
import { doAddTodo, doToggleTodo } from './actions/todo';
import { doSetFilter } from './actions/filter';
import { SHOW_ALL, SHOW_COMPLETED_TASKS, SHOW_INCOMPLETE_TASKS } from './constants/filter-types';


const unsubscribe = store.subscribe(() => {
	console.log('Store Updated, Current State:');
	console.log(store.getState());
});

console.log('Initial State:');
console.log(store.getState());

store.dispatch(doAddTodo('0', 'Learn Redux'));
store.dispatch(doAddTodo('1', 'Learn Mobx'));
store.dispatch(doToggleTodo('0'));

store.dispatch(doSetFilter(SHOW_COMPLETED_TASKS));
store.dispatch(doSetFilter(SHOW_INCOMPLETE_TASKS));

unsubscribe();
