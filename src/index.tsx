import { configureStore, createSlice } from "@reduxjs/toolkit"
import { createRoot } from "react-dom/client"
import { Provider, useDispatch, useSelector } from "react-redux"

// slice
const slice = createSlice({
	name: "library",
	initialState: {
		collection: {
			books: [
				{ id: 1, title: "1984" },
				{ id: 2, title: "Brave New World" },
			],
		},
	},
	reducers: {
		removeBook: (state, action) => {
			return state
		},
	},
})

const { removeBook } = slice.actions

// App.tsx
const App = () => {
	const books = useSelector((state: RootState) => state.library.collection.books)
	const dispatch = useDispatch()

	const removeLastBook = () => {
		if (books.length > 0) {
			dispatch(removeBook(books[books.length - 1].id))
		}
	}

	return (
		<>
			<button onClick={removeLastBook}>Remove Last Book</button>
			<ul>
				{books.map((book) => (
					<li key={book.id}>{book.title}</li>
				))}
			</ul>
		</>
	)
}

// store.ts
export const store = configureStore({
	reducer: {
		library: slice.reducer,
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
// При нажатии на кнопку Remove Last Book, последняя книга в коллекции не удаляется 🥲

// 🪛 Задача:
// Перепишите изменение стейта таким образом, чтобы при нажатии на кнопку Remove Last Book,
// последняя книга удалялась из коллекции.
// В качестве ответа укажите исправленную строку кода.
// ❗Изменение стейта должно быть написано мутабельным образом.