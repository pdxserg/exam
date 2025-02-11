import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

type Photo = {
	albumId: string;
	id: string;
	title: string;
	url: string;
};

// Api
const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" }),
	endpoints: (builder) => {
		return {
			getPhotos: builder.query<Photo[], void>({
				query: () => "photos",
			}),
			updatePhoto: builder.mutation<Photo, { id: string; title: string }>({
				query: ({ id, title }) => {
					return {
						method: "PUT",
						url: `photos/${id}`,
						body: { title },
					};
				},
			}),
		};
	},
});

const { useGetPhotosQuery, useUpdatePhotoMutation } = api;

// App.tsx
const App = () => {
	const { data } = useGetPhotosQuery();
	const [trigger] = useUpdatePhotoMutation();

	const updatePhotoTitleHandler = (id: string) => {
		trigger({ id, title: "Тестовое сообщение" });
	};

	return (
		<>
			{data?.map((el) => {
				return (
					<div key={el.id} style={{ margin: "15px" }}>
						<b>title</b> - {el.title}
						<button onClick={() => updatePhotoTitleHandler(el.id)}>Update title</button>
					</div>
				);
			})}
		</>
	);
};

// store.ts
const store = configureStore({
	reducer: { [api.reducerPath]: api.reducer },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<App />
	</Provider>,
);

// 📜 Описание:
// Нажмите на кнопку Update title и обновите страницу. После обновления страницы title
// изменится, но хотелось бы не перегружать страницу

// 🪛 Задача:
// Реализуйте автоматический re-fetching используя теги. Т.е. чтобы после нажатия на кнопку Update title, title обновился без ручной перезагрузки страницы
// обновился без ручной перезагрузки страницы

// 💡 Подсказка: необходимо дописать 3 строки кода
// В ответе укажите добавленные строки кода через пробел
// ❗Запятую в конце строки указывать обязательно

// 🖥 Пример ответа: xxx: {id: 1}, yyy: {id: 2}, zzz: {id: 3}
