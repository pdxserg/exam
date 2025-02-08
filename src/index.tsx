import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit"
import { createRoot } from "react-dom/client"
import { Provider, useDispatch, useSelector } from "react-redux"

// slice
const slice = createSlice({
	name: "fruits",
	initialState: {
		basket: [
			{ id: 1, name: "Apple" },
			{ id: 2, name: "Banana" },
		],
	},
	reducers: {
		addFruit: (state, action) => {
			state.basket.push(action.payload)
		},
	},
})

const { addFruit } = slice.actions

// App.tsx
const App = () => {
	const fruits = useSelector((state: RootState) => state.fruits.basket)
	const dispatch = useDispatch()

	const addNewFruit = () => {
		const newFruit = { id: nanoid(), name: "Orange" }
		dispatch(addFruit(newFruit))
	}

	return (
		<>
			<button onClick={addNewFruit}>Add Fruit</button>
			<ul>
				{fruits.map((fruit) => (
					<li key={fruit.id}>{fruit.name}</li>
				))}
			</ul>
		</>
	)
}

// store.ts
export const store = configureStore({
	reducer: {
		fruits: slice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

// main.ts
createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<App />
	</Provider>,
)

// 📜 Описание:
// При нажатии на кнопку Add Fruit, новый фрукт не добавляется в корзину 🥲

// 🪛 Задача:
// Перепишите изменение стейта таким образом, чтобы при нажатии на кнопку Add Fruit,
// новый фрукт добавлялся в корзину
// В качестве ответа укажите исправленную строку кода.
// ❗Изменение стейта должно быть написано мутабельным образом