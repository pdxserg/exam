import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

// Types
type Todolist = {
	id: string;
	title: string;
	order: number;
	createdAt: string;
	updatedAt: string;
	completed: boolean;
};

const api = createApi({
	reducerPath: "api",
	baseQuery: async (args, api, extraOptions) => {
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Эмуляция задержки

		return fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" })(
			args,
			api,
			extraOptions,
		);
	},
	endpoints: (builder) => {
		const url = Math.random() < 0.5 ? "todos" : "todos👺";
		return {
			todolists: builder.query<Todolist[], void>({
				query: () => url,
			}),
		};
	},
});

const { useTodolistsQuery } = api;

// Component
const App = () => {
	// ❗Использовать деструктуризацию запрещено
	const data = useTodolistsQuery();
	console.log(data)
	// const { isLoading, isSuccess, isError} = useTodolistsQuery();




	return (
		<>
			{
				<>
					{data.data?.map((t) => {
						return (
							<div style={t.completed ? { color: "grey" } : {}} key={t.id}>
								<input type="checkbox" checked={t.completed} />
								<b>Описание</b>: {t.title}
							</div>
						);
					})}
				</>
			}
			{/*✅✅✅*/}
			{data.isLoading && <h2>Загрузка...</h2>}
			{data.isSuccess && <h2>👩‍💻 Секретный код: BHOlh#</h2>}
			{data.isError && <h2> Error: 👺👺👺</h2>}
		</>
	);
};

// Store
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
// Тудулисты с вероятностью в 50% подгружаюся успешно или падают с ошибкой.
// Но изначально на экране мы видим: Загрузку, секретный код и сообщение об ошибке

// 🪛 Задача:
// Что нужно написать вместо "❗X","❗Y" и "❗Z" для того, чтобы:
// 1. Загрузка показывалась только во время загрузки
// 2. Секретный код показывалась только если запрос прошел успешно
// 3. Ошибка показывалась только в случае ошибки

// ❗ Ответ дайте через пробел
// 🖥 Пример ответа: one two three