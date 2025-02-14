import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";

// slice
const slice = createSlice({
	name: "taskManager",
	initialState: {
		tasks: [
			{ id: 1, title: "Task 1" },
			{ id: 2, title: "Task 2" },
			{ id: 3, title: "Task 3" },
		],
	},
	reducers: {
		addTask: (state, action) => {
			return state;
		},
	},
	selectors: {
		// ❗❗❗XXX ❗❗❗
	},
});

const { addTask } = slice.actions;
const { selectTasks } = slice.selectors;

// App.tsx
const App = () => {
	const tasks = useSelector(selectTasks);

	return (
		<>
			<ul>
				{tasks.map((task) => (
					<li key={task.id}>{task.title}</li>
				))}
			</ul>
		</>
	);
};

// store.ts
export const store = configureStore({
	reducer: {
		taskManager: slice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

// main.ts
createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<App />
	</Provider>,
);

// 📜 Описание:
// Перед вами нерабочий код и его нужно починить, чтобы отобразился массив тасок

// 🪛 Задача:
// Что нужно написать вместо // ❗❗❗XXX ❗❗❗, чтобы отобразился массив тасок