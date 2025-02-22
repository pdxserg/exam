import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";

// App slice
type NotificationLevel = "loading" | "none" | "success" | "error";

const appSlice = createSlice({
	name: "app",
	initialState: {
		notification: "none" as NotificationLevel,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher<NotificationLevel>(
				(action) => action.type.endsWith("/pending"),
				(state) => {
					state.notification = "loading"
				},
			)
			.addMatcher<NotificationLevel>(
				(action) => action.type.endsWith("/fulfilled"),
				(state) => {
					state.notification = "success"
				},
			)
			.addMatcher<NotificationLevel>(
				(action) => action.type.endsWith("/rejected"),
				(state) => {
					state.notification = "error"
				},
			)
	},
	selectors: {
		selectNotification: (slice) => slice.notification,
	},
});

const { selectNotification } = appSlice.selectors;

// Api
type Photo = {
	albumId: string;
	id: string;
	title: string;
	url: string;
};

const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" }),
	endpoints: (builder) => ({
		getPhotos: builder.query<Photo[], void>({
			query: () => "photos?delay=2",
		}),
	}),
});

const { useGetPhotosQuery } = api;

// App.tsx
const App = () => {
	const notification = useAppSelector(selectNotification);

	const { data } = useGetPhotosQuery();

	return (
		<>
			{notification === "loading" && <b style={{ fontSize: "36px" }}>🕝Загрузка...</b>}
			{notification === "success" && <b style={{ fontSize: "36px" }}>✅ Успех</b>}
			{notification === "error" && <b style={{ fontSize: "36px" }}>❌ Ошибка</b>}
			{data?.map((el) => {
				return (
					<div key={el.id} style={{ margin: "5px", padding: "5px", width: "200px" }}>
						<b>title</b> - {el.title}
						<img src={el.url} alt={`${el.title} image`} />
					</div>
				);
			})}
		</>
	);
};

// store.ts
const store = configureStore({
	reducer: {
		[appSlice.name]: appSlice.reducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

type RootState = ReturnType<typeof store.getState>;
const useAppSelector = useSelector.withTypes<RootState>();

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<App />
	</Provider>,
);
// 📜 Описание:
// При загрузке приложения пользователь видит пустой экран и только спустя 2 секунды видит информацию.

// 🪛 Задача:
// Что нужно написать вместо `// ❗❗❗XXX❗❗❗` для того, чтобы при загрузке приложения
// пользователь увидел `🕝Загрузка...`, в случае успешной загрузки увидел `✅ Успех`, а в случае
// ошибки `❌ Ошибка`

// 💡 Подсказка: для решения задачи используйте addMatcher
// // ❗Порядок обработки нотификаций: загрука, успех, ошибка