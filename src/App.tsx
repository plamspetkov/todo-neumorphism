import { useState, useEffect } from 'react';
import Header from './components/Header';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Todo } from './model';

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>('');
	const [todos, setTodos] = useState<Array<Todo>>([]);
	const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

	useEffect(() => {
		const storedTodos = localStorage.getItem('todos') || '[]';
		const storedCompletedTodos = localStorage.getItem('completedTodos') || '[]';
		if (storedTodos.length > 0 || storedCompletedTodos.length > 0) {
			setTodos(JSON.parse(storedTodos));
			setCompletedTodos(JSON.parse(storedCompletedTodos));
		}
	}, []);

	console.log('active', todos);
	console.log('done', completedTodos);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (todo) {
			const newTodos = [...todos, { id: Date.now(), todo, isDone: false }];
			setTodos(newTodos);
			localStorage.setItem('todos', JSON.stringify(newTodos));
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
			active.splice(source.index, 1);
		} else {
			add = complete[source.index];
			complete.splice(source.index, 1);
		}

		// Destination Logic
		if (destination.droppableId === 'TodosList') {
			add.isDone = false;
			active.splice(destination.index, 0, add);
		} else {
			add.isDone = true;
			complete.splice(destination.index, 0, add);
		}

		setCompletedTodos(complete);
		setTodos(active);

		localStorage.setItem('todos', JSON.stringify(active));
		localStorage.setItem('completedTodos', JSON.stringify(complete));
	};

	const handleDoneClick = (id: number) => {
		// Find the task in the todos array
		const taskIndex = todos.findIndex((todo) => todo.id === id);

		// If the task is found in the todos array
		if (taskIndex >= 0) {
			// Update the task's isDone state to true
			const task = { ...todos[taskIndex], isDone: true };

			// Remove the task from the todos array
			const newTodos = [...todos];
			newTodos.splice(taskIndex, 1);

			// Add the task to the completedTodos array
			const newCompletedTodos = [...completedTodos, task];

			// Update the state
			setTodos(newTodos);
			setCompletedTodos(newCompletedTodos);

			// Update the local storage
			localStorage.setItem('todos', JSON.stringify(newTodos));
			localStorage.setItem('completedTodos', JSON.stringify(newCompletedTodos));
		} else {
			// If the task is not found in the todos array, find it in the completedTodos array
			const completedTaskIndex = completedTodos.findIndex(
				(todo) => todo.id === id
			);

			if (completedTaskIndex < 0) return; // If the task is not found, do nothing

			// Update the task's isDone state to false
			const task = { ...completedTodos[completedTaskIndex], isDone: false };

			// Remove the task from the completedTodos array
			const newCompletedTodos = [...completedTodos];
			newCompletedTodos.splice(completedTaskIndex, 1);

			// Add the task back to the todos array
			const newTodos = [...todos, task];

			// Update the state
			setTodos(newTodos);
			setCompletedTodos(newCompletedTodos);

			// Update the local storage
			localStorage.setItem('todos', JSON.stringify(newTodos));
			localStorage.setItem('completedTodos', JSON.stringify(newCompletedTodos));
		}
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
					handleDoneClick={handleDoneClick}
				/>
			</div>
		</DragDropContext>
	);
};

export default App;
