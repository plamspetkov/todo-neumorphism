import { useReducer, useState } from 'react';
import Header from './components/Header';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { TodoReducer } from './reducer/todoReducer';

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>('');
	const [state, dispatch] = useReducer(TodoReducer, []);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (todo) {
			dispatch({ type: 'add', payload: todo });
			setTodo('');
		}
	};

	return (
		<div className="App">
			<Header title="Taskify" />
			<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
			<TodoList todos={state} dispatch={dispatch} />
		</div>
	);
};

export default App;
