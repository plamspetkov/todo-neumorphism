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
		<div className="flex flex-col gap-[3rem] w-full mt-[10px] justify-between items-start lg:flex-row  ">
			<Droppable droppableId="TodosList">
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={`${
							snapshot.isDraggingOver ? 'dragover' : ''
						} w-full flex flex-col justify-start items-start min-h-[100px] lg:flex-1 lg:items-center`}
					>
						<span className="title text-[#28d942] !text-[24px] lg:!text-[30px] ">
							Active Tasks
						</span>
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
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={`${
							snapshot.isDraggingOver ? 'dragover' : ''
						} w-full flex flex-col justify-start items-start min-h-[100px] lg:flex-1 lg:items-center`}
					>
						<span className="title text-[#fe3939] !text-[24px] lg:!text-[30px] ">
							Completed Tasks
						</span>
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
