import React, { useEffect, useRef, useState } from 'react';
import { Action, Todo } from '../model';
import { MdModeEdit, MdDelete, MdDone } from 'react-icons/md';
type Props = {
	todo: Todo;
	dispatch: React.Dispatch<Action>;
};
const SingleTodo = ({ todo, dispatch }: Props) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);

	const handleDone = (id: number) => {
		dispatch({
			type: 'done',
			payload: id,
		});
	};

	const handleDelete = (id: number) => {
		dispatch({
			type: 'remove',
			payload: id,
		});
	};

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault();
		dispatch({
			type: 'edit',
			payload: { id, todo: editTodo },
		});
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
