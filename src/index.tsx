import { configureStore, createSlice } from "@reduxjs/toolkit"
import { createRoot } from "react-dom/client"
import { Provider, useDispatch, useSelector } from "react-redux"

type Note = {
	id: number
	content: string
	important: boolean
}

// slice
const slice = createSlice({
	name: "notes",
	initialState: {
		items: [
			{ id: 1, content: "Buy groceries", important: false },
			{ id: 2, content: "Schedule meeting", important: true },
			{ id: 3, content: "Call mom", important: false },
		],
	},
	reducers: {
		updateNote: (state, action) => {
			return state
		},
	},
})

const { updateNote } = slice.actions

// App.tsx
const App = () => {
	const notes = useSelector((state: RootState) => state.notes.items)
	const dispatch = useDispatch()

	const toggleImportance = (note: Note) => {
		dispatch(updateNote({ id: note.id, important: !note.important }))
	}

	return (
		<ul>
			{notes.map((note) => (
				<li key={note.id}>
          <span
	          style={{
		          fontWeight: note.important ? "bold" : "normal",
	          }}
          >
            {note.content}
          </span>
					<button onClick={() => toggleImportance(note)}>{note.important ? "Unmark" : "Mark Important"}</button>
				</li>
			))}
		</ul>
	)
}

// store.ts
export const store = configureStore({
	reducer: {
		notes: slice.reducer,
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
// При нажатии на кнопку Mark Important или Unmark рядом с заметкой, важность заметки не обновляется 🥲

// 🪛 Задача:
// Перепишите изменение стейта таким образом, чтобы при нажатии на кнопку Mark Important или Unmark,
// состояние важности заметки обновлялось.
// В качестве ответа укажите исправленную строку кода.
// ❗Изменение стейта должно быть написано мутабельным образом
// ❗Не используйте деструктуризацию action.payload (const {id} = action.payload)
// ❗Не создавайте переменные из action.payload (const id = action.payload.id)