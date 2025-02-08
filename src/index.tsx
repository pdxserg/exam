import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";

// slice
const slice = createSlice({
	name: "classroom",
	initialState: {
		students: [
			{ id: 1, name: "Alice" },
			{ id: 2, name: "Bob" },
			{ id: 3, name: "Charlie" },
		],
	},
	reducers: {
		removeStudent: (state, action) => {
			const index = state.students.findIndex((t) => t.id === action.payload.id)
			if (index !== -1) {
				state.students.splice(index, 1)
			}
		},
	},
});

const { removeStudent } = slice.actions;

// App.tsx
const App = () => {
	const students = useSelector((state: RootState) => state.classroom.students);
	const dispatch = useDispatch();

	const handleRemove = (id: number) => {
		dispatch(removeStudent(id));
	};

	return (
		<ul>
			{students.map((student) => (
				<li key={student.id}>
					{student.name}
					<button onClick={() => handleRemove(student.id)}>✖</button>
				</li>
			))}
		</ul>
	);
};

// store.ts
export const store = configureStore({
	reducer: {
		classroom: slice.reducer,
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
// При нажатии на кнопку ✖ рядом с именем студента, студент не удаляется из списка 🥲

// 🪛 Задача:
// Перепишите изменение стейта таким образом, чтобы при нажатии на кнопку ✖, студент удалялся из списка.
// В качестве ответа укажите исправленную строку кода.
// ❗Изменение стейта должно быть написано мутабельным образом
// ❗Не используйте деструктуризацию action.payload (const {id} = action.payload)
// ❗Не создавайте переменные из action.payload (const id = action.payload.id)