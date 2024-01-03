import React from 'react';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface props {
	todos: Array<Todo>;
	setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
	setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
	completedTodos: Array<Todo>;
	handleDoneClick: (id: number) => void;
}

const TodoList: React.FC<props> = ({
	todos,
	setTodos,
	completedTodos,
	setCompletedTodos,
	handleDoneClick,
}) => {
	return (
		<div className="flex w-full mt-[10px] justify-between gap-[2rem] items-start">
			<Droppable droppableId="TodosList">
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="flex-1 flex flex-col justify-center items-center bg-white min-h-[100px]"
					>
						<span>Active Tasks</span>
						{todos?.map((todo, index) => (
							<SingleTodo
								index={index}
								todos={todos}
								todo={todo}
								key={todo.id}
								setTodos={setTodos}
								handleDoneClick={handleDoneClick}
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
						className="flex-1 flex flex-col justify-center items-center bg-white min-h-[100px]"
					>
						<span>Completed Tasks</span>
						{completedTodos?.map((todo, index) => (
							<SingleTodo
								index={index}
								todos={completedTodos}
								todo={todo}
								key={todo.id}
								setTodos={setCompletedTodos}
								handleDoneClick={handleDoneClick}
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
