import React from 'react';
import { Action, Todo } from '../model';
import SingleTodo from './SingleTodo';

interface Props {
	todos: Todo[];
	dispatch: React.Dispatch<Action>;
}
const TodoList: React.FC<Props> = ({ todos, dispatch }) => {
	return (
		<div className="flex justify-start gap-4 w-[100%] flex-wrap">
			{todos.map((todo) => (
				<SingleTodo key={todo.id} dispatch={dispatch} todo={todo} />
			))}
		</div>
	);
};

export default TodoList;
