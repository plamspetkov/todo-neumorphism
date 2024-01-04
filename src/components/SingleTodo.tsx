import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { MdModeEdit, MdDelete, MdDone } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';
const SingleTodo: React.FC<{
	index: number;
	todo: Todo;
	todos: Array<Todo>;
	setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
	handleDoneClick: (id: number) => void;
	completedTodos: Array<Todo>;
}> = ({ index, todo, todos, setTodos, handleDoneClick, completedTodos }) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);

	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault();
		const updateTodo = todos.map((todo) =>
			todo.id === id ? { ...todo, todo: editTodo } : todo
		);
		setTodos(updateTodo);
		localStorage.setItem('todos', JSON.stringify(updateTodo));
		setEdit(false);
	};

	const handleDelete = (id: number, isCompleted: boolean) => {
		let updatedTodos;

		if (isCompleted) {
			updatedTodos = completedTodos.filter((todo) => todo.id !== id);
			localStorage.setItem('completedTodos', JSON.stringify(updatedTodos));
		} else {
			updatedTodos = todos.filter((todo) => todo.id !== id);
			localStorage.setItem('todos', JSON.stringify(updatedTodos));
		}

		setTodos(updatedTodos);
		// const deleteTodo = todos.filter((todo) => todo.id !== id);
		// setTodos(deleteTodo);
		// localStorage.setItem('todos', JSON.stringify(deleteTodo));
		// localStorage.setItem('completedTodos', JSON.stringify(deleteTodo));
	};

	// const handleDone = (id: number) => {
	// 	setTodos(
	// 		todos.map((todo) =>
	// 			todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
	// 		)
	// 	);
	// };

	return (
		<Draggable draggableId={todo.id.toString()} index={index} key={todo.id}>
			{(provided, snapshot) => (
				<form
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={`${
						edit || (todo.isDone && !snapshot.isDragging)
							? 'editTodo'
							: snapshot.isDragging
							? 'drag'
							: 'todo'
					} flex w-[100%]  justify-between items-center gap-4 rounded p-[20px] mt-[15px]`}
					onSubmit={(e) => handleEdit(e, todo.id)}
				>
					{edit ? (
						<input
							ref={inputRef}
							value={editTodo}
							onChange={(e) => setEditTodo(e.target.value)}
							className="flex-1 p-[5px] bg-transparent editText w-full  border-none outline-none 
        rounded text-[20px] font-normal caret-amber-500 "
						/>
					) : (
						<span
							className={`${
								todo.isDone
									? ' !text-[#fe3939] line-through decoration-[#fe3939] blur-[0.7px] hover:blur-0'
									: '!text-[#28d942] blur-[0.7px] hover:blur-0'
							} text-[20px] flex-1 p-[5px]`}
						>
							{todo.todo}
						</span>
					)}

					<div className="icons flex gap-[10px] px-[5px] text-[20px] cursor-pointer">
						<span
							className={`${
								edit ? 'text-[#ff5900] blur-[0.7px]' : 'text-[#262b2f] '
							} ${
								todo.isDone
									? 'hover:text-none cursor-default '
									: 'hover:text-[#ff5900] hover:blur-[0.7px]'
							} transition-all transition-duration-300`}
							onClick={() => {
								if (!edit && !todo.isDone) {
									setEdit(!edit);
								}
							}}
						>
							<MdModeEdit />
						</span>
						<span
							className={`${
								todo.isDone ? 'text-[#fe3939] blur-[0.7px]' : 'text-[#262b2f]'
							}  hover:text-[#fe3939] hover:blur-[0.7px] transition-all transition-duration-300`}
							onClick={() => handleDelete(todo.id, todo.isDone)}
						>
							<MdDelete />
						</span>
						<span
							className={`${
								todo.isDone
									? 'text-[#28d942] blur-[0.7px] '
									: edit
									? '!text-[#262b2f] !hover:text-[#262b2f] cursor-default'
									: 'text-[#262b2f] blur-[0.7px]'
							}  hover:text-[#28d942] hover:blur-[0] transition-all transition-duration-300`}
							onClick={() => {
								if (!edit) {
									handleDoneClick(todo.id);
								}
							}}
						>
							<MdDone />
						</span>
					</div>
				</form>
			)}
		</Draggable>
	);
};

export default SingleTodo;
