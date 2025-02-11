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
		};
	},
});

const { useGetPhotosQuery, useLazyGetPhotosQuery } = api;

// App.tsx
const App = () => {
	// ❗❗❗XXX❗❗❗

	const getPhotosHandler = () => {
		trigger();
	};

	return (
		<>
			<button onClick={getPhotosHandler}>Get photos</button>
			{data?.map((el) => {
				return (
					<div key={el.id} style={{ border: "1px solid", margin: "5px", padding: "5px" }}>
						<div>
							<b>title</b> - {el.title}
						</div>
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
// Приложение падает с ошибкой

// 🪛 Задача:
// Почините приложение.
// Что нужно написать вместо `// ❗❗❗XXX❗❗❗` чтобы при нажатии на кнопку `Get photos`
// отобразились данные пришедшие с сервера
// В качестве ответа укажите написанный вами код
