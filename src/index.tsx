import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";

// oxygenCounter slice
const oxygenSlice = createSlice({
	name: "oxygenCounter",
	initialState: {
		percent: 21,
	},
	reducers: {
		increase: (state) => {
			state.percent += 1;
		},
	},
});
const { increase } = oxygenSlice.actions;

// temperature slice
const temperatureSlice = createSlice({
	name: "temperatureCounter",
	initialState: {
		celsius: 20,
	},
	reducers: {},
});

// App.tsx
const App = () => {
	const oxygen = useSelector((state: RootState) => state.oxygenCounter.percent);
	const temperature = useSelector((state: RootState) => state.temperatureCounter.celsius);
	const dispatch = useDispatch();

	return (
		<>
			<button onClick={() => dispatch(increase())}>Add Oxygen</button>
			<div>Oxygen: {oxygen}%</div>
			<hr />
			<div>Temperature: {temperature}°C</div>
		</>
	);
};

// store.ts
export const store = configureStore({
	reducer: {
		oxygenCounter: oxygenSlice.reducer,
		temperatureCounter: temperatureSlice.reducer,
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
// У вас есть два счетчика: для уровня кислорода (%) и температуры (°C).
// При нажатии на кнопку Add Oxygen увеличивается уровень кислорода.

// 🪛 Задача:
// Реализуйте следующую задачу:
// При нажатии на кнопку Add Oxygen помимо увеличения уровня кислорода
// реализуйте увеличении температуры на 2°C

// В качестве ответа укажите добавленный вами код
// ❗Операция должна быть реализована мутабельным образом
// 💡Подсказка. Используйте extraReducers
