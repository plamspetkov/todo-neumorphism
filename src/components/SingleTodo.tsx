import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { MdModeEdit, MdDelete, MdDone } from 'react-icons/md';
type Props = {
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
const SingleTodo = ({ todo, todos, setTodos }: Props) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);

	const handleDone = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
			)
		);
	};
	const handleDelete = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault();
		setTodos(
			todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
		);
		setEdit(false);
	};

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	return (
		<form
			className="todo flex w-[100%] md:max-w-max justify-between items-center gap-4 rounded p-[20px] mt-[15px]"
			onSubmit={(e) => handleEdit(e, todo.id)}
		>
			{edit ? (
				<input
					ref={inputRef}
					value={editTodo}
					onChange={(e) => setEditTodo(e.target.value)}
					className="input w-full  p-[5px] border-none outline-none 
        rounded text-2xl font-normal caret-amber-500"
				/>
			) : todo.isDone ? (
				<s className="text-[20px] flex-1 p-[5px]">{todo.todo}</s>
			) : (
				<span className="text-[20px] flex-1 p-[5px]">{todo.todo}</span>
			)}

			<div className="icons flex gap-[10px] px-[5px] text-[20px] cursor-pointer">
				<span
					className="text-[#262b2f]  hover:text-[#ff5900] hover:blur-[0.7px] transition-all transition-duration-300"
					onClick={() => {
						if (!edit && !todo.isDone) {
							setEdit(!edit);
						}
					}}
				>
					<MdModeEdit />
				</span>
				<span
					className="text-[#262b2f]  hover:text-[#ff5900] hover:blur-[0.7px] transition-all transition-duration-300"
					onClick={() => handleDelete(todo.id)}
				>
					<MdDelete />
				</span>
				<span
					className="text-[#262b2f]  hover:text-[#ff5900] hover:blur-[0.7px] transition-all transition-duration-300"
					onClick={() => handleDone(todo.id)}
				>
					<MdDone />
				</span>
			</div>
		</form>
	);
};

export default SingleTodo;
