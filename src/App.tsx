import { useState } from 'react';
import Header from './components/Header';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Todo } from './model';

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>('');
	const [todos, setTodos] = useState<Array<Todo>>([]);
	const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (todo) {
			setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
			setTodo('');
		}
	};

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		let add;
		const active = todos;
		const complete = completedTodos;
		// Source Logic
		if (source.droppableId === 'TodosList') {
			add = active[source.index];
			add.isDone = true;
			active.splice(source.index, 1);
		} else {
			add = complete[source.index];
			add.isDone = false;
			complete.splice(source.index, 1);
		}

		// Destination Logic
		if (destination.droppableId === 'TodosList') {
			active.splice(destination.index, 0, add);
		} else {
			complete.splice(destination.index, 0, add);
		}

		setCompletedTodos(complete);
		setTodos(active);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App">
				<Header title="Taskify" />
				<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
				<TodoList
					todos={todos}
					setTodos={setTodos}
					completedTodos={completedTodos}
					setCompletedTodos={setCompletedTodos}
				/>
			</div>
		</DragDropContext>
	);
};

export default App;
