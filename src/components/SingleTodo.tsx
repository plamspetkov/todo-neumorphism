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
			className={`${
				edit ? 'editTodo' : 'todo'
			} flex w-[100%] md:max-w-max justify-between items-center gap-4 rounded p-[20px] mt-[15px]`}
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
							? '!text-[#fe3939] line-through decoration-[#fe3939] blur-[0.7px] '
							: '!text-[#28d942] blur-[0.7px]'
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
					onClick={() => handleDelete(todo.id)}
				>
					<MdDelete />
				</span>
				<span
					className={`${
						todo.isDone ? 'text-[#28d942]' : 'text-[#262b2f]'
					}  hover:text-[#28d942] hover:blur-[0.7px] transition-all transition-duration-300`}
					onClick={() => handleDone(todo.id)}
				>
					<MdDone />
				</span>
			</div>
		</form>
	);
};

export default SingleTodo;
