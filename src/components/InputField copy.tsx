import React, { useRef } from 'react';
interface Props {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent) => void;
}
const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<form
			onSubmit={(e) => {
				handleAdd(e);
				inputRef.current?.blur();
			}}
			className="mx-[1rem] my-[1rem] flex relative items-center  w-full"
		>
			<input
				ref={inputRef}
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
				type="input"
				placeholder="Enter a Task"
				className="input w-full  px-[20px] py-[30px] border-none outline-none 
        rounded text-2xl font-normal caret-amber-500"
			/>
			<button
				type="submit"
				disabled={todo.length === 0 || todo === null}
				className="btn flex justify-center items-center text-4xl  uppercase absolute w-[50px] h-[50px] m-[12px] right-0 border-none rounded transition-all transition-duration-300"
			>
				<span className="span font-black" title="Go">
					Go
				</span>
			</button>
		</form>
	);
};

export default InputField;
