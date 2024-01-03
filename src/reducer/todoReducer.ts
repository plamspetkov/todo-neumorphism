// todoReducer.ts
import { Todo, Action } from './model';

export const todoReducer = (state: Todo[], action: Action): Todo[] => {
	switch (action.type) {
		case 'add':
			return [
				...state,
				{
					id: Date.now(),
					todo: action.payload,
					isDone: false,
				},
			];
		case 'remove':
			return state.filter((todo) => todo.id !== action.payload);
		case 'done':
			return state.map((todo) =>
				todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
			);
		case 'edit':
			return state.map((todo) =>
				todo.id === action.payload.id
					? { ...todo, todo: action.payload.todo }
					: todo
			);
		case 'move': {
			const { destId, taskId } = action.payload;
			const sourceList = state.find((todo) => todo.id === taskId);

			if (!sourceList) {
				return state;
			}

			const updatedSourceList = {
				...sourceList,
				isDone: destId === 'TodosRemove',
			};

			return state.map((todo) =>
				todo.id === taskId ? updatedSourceList : todo
			);
		}

		default:
			return state;
	}
};
