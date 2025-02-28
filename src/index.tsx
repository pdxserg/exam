import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

// API
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
			query: () => "photos?delay=1",
		}),
	}),
});

const { useGetPhotosQuery } = api;

// App.tsx
const App = () => {
	const { data, isSuccess, isLoading } = useGetPhotosQuery();
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	useEffect(() => {
		// ❗X
	}, [isSuccess]);

	return (
		<>
			{isLoading && <b style={{ fontSize: "36px" }}>🕝Загрузка...</b>}
			{showSuccessMessage && <b style={{ fontSize: "36px" }}>✅ Успех</b>}
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
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<App />
	</Provider>,
);

// 📜 Описание:
// На экране мы видим загрузку и затенм результат от сервера (photos).

// 🪛 Задача:
// Что нужно написать вместо `// ❗X` для того, чтобы в случае успешного завершения запроса
// пользователь увидел сообщение `✅ Успех` и через 2 секунды это сообщение должно исчезнуть

// После загрузки приложения подгружается информация о photos и если запрос прошел успешно мы видим об этом информацию (✅ Успех) и через 2 секунды это сообщение исчезает http://surl.li/mhseut
// ❗Ответ будет принят только в том случае если вы отработаете утечку памяти
