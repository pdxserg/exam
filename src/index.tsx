import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";

// slice
const slice = createSlice({
	name: "playlist",
	initialState: {
		albums: [
			{
				id: 1,
				title: "Album 1",
				songs: [
					{ id: 1, title: "Song 1-1" },
					{ id: 2, title: "Song 1-2" },
				],
			},
			{
				id: 2,
				title: "Album 2",
				songs: [
					{ id: 3, title: "Song 2-1" },
					{ id: 4, title: "Song 2-2" },
				],
			},
		],
	},
	reducers: {
		removeLastSongFromAlbum: (state, action) => {
			return state;
		},
	},
});

const { removeLastSongFromAlbum } = slice.actions;

// App.tsx
const App = () => {
	const albums = useSelector((state: RootState) => state.playlist.albums);
	const dispatch = useDispatch();

	const removeLastSong = (albumId: number) => {
		dispatch(removeLastSongFromAlbum(albumId));
	};

	return (
		<>
			{albums.map((album) => (
				<div key={album.id}>
					<h3>{album.title}</h3>
					<button onClick={() => removeLastSong(album.id)}>Remove Last Song</button>
					<ul>
						{album.songs.map((song) => (
							<li key={song.id}>{song.title}</li>
						))}
					</ul>
				</div>
			))}
		</>
	);
};

// store.ts
export const store = configureStore({
	reducer: {
		playlist: slice.reducer,
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
// Плейлист разделён на альбомы, и каждая кнопка Remove Last Song должна удалять последнюю песню из соответствующего альбома.

// 🪛 Задача:
// Перепишите изменение стейта таким образом, чтобы описание выше выполнялось
// В качестве ответа укажите исправленный код написанный вместо return state.
// ❗Изменение стейта должно быть написано мутабельным образом.
// ❗Не используйте деструктуризацию action.payload (const {id} = action.payload)
// ❗Не создавайте переменные из action.payload (const id = action.payload.id)