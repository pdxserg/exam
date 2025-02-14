import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";

// slice
const slice = createSlice({
	name: "temperature",
	initialState: {
		celsius: 20,
	},
	reducers: {
		increase: (state) => {
			state.celsius=state.celsius+1
		},
	},
});

const { increase } = slice.actions;

// App.tsx
const App = () => {
	const temp = useSelector((state: RootState) => state.temperature.celsius);
	const dispatch = useDispatch();

	return (
		<>
			<button onClick={() => dispatch(increase())}>Increase Temp</button>
			<span>{temp}°C</span>
		</>
	);
};

// store.ts
export const store = configureStore({
	reducer: {
		temperature: slice.reducer,
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
// При нажатии на кнопку Increase Temp температура не увеличивается 🥲

// 🪛 Задача:
// Перепишите изменение стейта таким образом, чтобы при нажатии на кнопку Increase Temp,
// температура увеличивалась на 1 градус
// В качестве ответа укажите исправленную строку кода.
// ❗Изменение стейта должно быть написано мутабельным образом
