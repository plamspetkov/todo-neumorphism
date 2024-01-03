import React from 'react';
import { Action, Todo } from '../model';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
	todos: Todo[];
	dispatch: React.Dispatch<Action>;
}
const TodoList: React.FC<Props> = ({ todos, dispatch }) => {
	const activeTodos = todos.filter((todo) => !todo.isDone);
	const completedTodos = todos.filter((todo) => todo.isDone);
	return (
		<div className="flex w-full mt-[10px] justify-between gap-[2rem] items-start">
			<Droppable droppableId="TodosAdd">
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="flex-1 flex flex-col justify-center items-center"
					>
						<span>Active Tasks</span>
						{activeTodos.map((todo, index) => (
							<SingleTodo
								index={index}
								key={todo.id}
								dispatch={dispatch}
								todo={todo}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Droppable droppableId="TodosRemove">
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="flex-1 flex flex-col justify-center items-center"
					>
						<span>Completed Tasks</span>
						{completedTodos.map((todo, index) => (
							<SingleTodo
								index={index}
								key={todo.id}
								dispatch={dispatch}
								todo={todo}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default TodoList;
