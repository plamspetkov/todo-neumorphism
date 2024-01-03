import { Action, Todo } from '../model';

export const TodoReducer = (state: Todo[], action: Action) => {
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
			const { destId, taskId, startIndex, endIndex } = action.payload;

			if (destId === 'TodosList' || destId === 'TodosRemove') {
				const updatedState = Array.from(state);
				const [movedTask] = updatedState.splice(startIndex, 1);
				updatedState.splice(endIndex, 0, movedTask);

				return updatedState;
			} else {
				const sourceList = state.filter((todo) => todo.id === taskId)[0];
				const updatedSourceList = {
					...sourceList,
					isDone: destId === 'TodosRemove',
				};

				// Update the source list
				const updatedState = state.map((todo) =>
					todo.id === taskId ? updatedSourceList : todo
				);

				return updatedState;
			}

			return state;

			// /////////////////////////////////////////////////////////////////////////////////////

			// const sourceList = state.filter((todo) => todo.id === taskId)[0];
			// const updatedSourceList = {
			// 	...sourceList,
			// 	isDone: destId === 'TodosRemove',
			// };

			// // Update the source list
			// const updatedState = state.map((todo) =>
			// 	todo.id === taskId ? updatedSourceList : todo
			// );

			// return updatedState;
			///////////////////////////

			// if (destId === 'TodosAdd' || destId === 'TodosRemove') {
			// 	const updatedState = Array.from(state);
			// 	const [movedTask] = updatedState.splice(startIndex, 1);
			// 	updatedState.splice(endIndex, 0, movedTask);

			// 	return updatedState;
			// }

			// return state;
		}

		default:
			return state;
	}
};
