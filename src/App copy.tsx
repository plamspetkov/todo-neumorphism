import { useReducer, useState } from 'react';
import Header from './components/Header';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { TodoReducer } from './reducer/todoReducer';
import { State } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>('');
	const [state, dispatch] = useReducer(TodoReducer, [] as State);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (todo) {
			dispatch({ type: 'add', payload: todo });
			setTodo('');
		}
	};

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		// Dispatch the 'move' action to handle moving tasks between lists
		dispatch({
			type: 'move',
			payload: {
				destId: destination.droppableId,
				taskId: parseInt(result.draggableId),
				startIndex: source.index,
				endIndex: destination.index,
			},
		});
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App">
				<Header title="Taskify" />
				<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
				<TodoList todos={state} dispatch={dispatch} />
			</div>
		</DragDropContext>
	);
};

export default App;
