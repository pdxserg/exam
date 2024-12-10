import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";

// slice
const slice = createSlice({
	name: "waterCounter",
	initialState: {
		liters: 10,
	},
	reducers: {
		count: (state) => {
			console.log(state);
		},
	},
});

const { count } = slice.actions;

// App.tsx
const App = () => {
	const water = useSelector((state: RootState) => state.waterCounter.liters);
	const dispatch = useDispatch();

	return (
		<>
			<button onClick={() => dispatch(count())}>Get Water</button>
			<span>{water} liters</span>
		</>
	);
};

// store.ts
export const store = configureStore({
	reducer: {
		waterCounter: slice.reducer,
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
// Откройте панель разработчика и нажмите на кнопку Get Water
// В консоли вы увидите такой результат
// Proxy(Object) {type_: 0, scope_: {…}, modified_: false, finalized_: false, assigned_: {…},

// 🪛 Задача:
// Выведите в консоль state таким образом, чтобы получить вот такой результат {liters: 10}
// В качестве ответа укажите исправленную строку кода.
