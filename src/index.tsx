import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";

// waterCounter slice
const waterSlice = createSlice({
	name: "waterCounter",
	initialState: {
		liters: 10,
	},
	reducers: {
		increase: (state) => {
			state.liters += 1;
		},
	},
});
const { increase } = waterSlice.actions;

// energy slice
const energySlice = createSlice({
	name: "energyCounter",
	initialState: {
		joules: 5000,
	},
	reducers: {
		decrease: (state) => {
			state.joules -= 100;
		},
	},
});

const { decrease } = energySlice.actions;

// App.tsx
const App = () => {
	const water = useSelector((state: RootState) => state.waterCounter.liters);
	const energy = useSelector((state: RootState) => state.energyCounter.joules);
	const dispatch = useDispatch();

	return (
		<>
			<button onClick={() => dispatch(increase())}>Add Water</button>
			<span>Water: {water} liters</span>

			<button onClick={() => dispatch(decrease())}>Use Energy</button>
			<span>Energy: {energy} joules</span>
		</>
	);
};

// store.ts
export const store = configureStore({
	reducer: {
		waterCounter: waterSlice.reducer,
		energyCounter: energySlice.reducer,
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
// У вас есть два счетчика: для воды (литры) и энергии (джоули).
// При нажатии на кнопку **Add Water** увеличивается количество воды.
// При нажатии на кнопку **Use Energy** энергия уменьшается на 100 джоулей.

// 🪛 Задача:
// Реализуйте следующую задачу:
// При нажатии на кнопку **Add Water** помимо увеличения количества воды
// реализуйте увеличении энергии на 200 джоулей.

// В качестве ответа укажите добавленный вами код
// ❗Операция должна быть реализована мутабельным образом.
// 💡Подсказка. Используйте extraReducers