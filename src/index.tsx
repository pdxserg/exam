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
	const {data, isLoading, isError, isFetching} = useTodolistsQuery();


	return (
		<>
			{
				<>
					{data?.map((t) => {
						return (import { configureStore } from "@reduxjs/toolkit";
						import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
						import React from "react";
						import { createRoot } from "react-dom/client";
						import { Provider, useDispatch } from "react-redux";
						import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router";

						type Product = {
							id: string;
							title: string;
							description: string;
							price: number;
						};

						type ProductsResponse = {
							total: number;
							messages: string[];
							page: number;
							pageCount: number;
							data: Product[];
						};

						type Film = {
							id: number;
							nameOriginal: string;
							description: string;
							ratingImdb: number;
						};

						type FilmsResponse = {
							total: number;
							messages: string[];
							page: number;
							pageCount: number;
							data: Film[];
						};

// Api
						const api = createApi({
							reducerPath: "api",
							baseQuery: fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" }),
							endpoints: (builder) => {
								return {
									getFilms: builder.query<FilmsResponse, void>({
										query: () => "films",
									}),
									getProducts: builder.query<ProductsResponse, void>({
										query: () => "products",
									}),
								};
							},
						});

						const { useGetFilmsQuery, useGetProductsQuery } = api;

// Films.tsx
						const Films = () => {
							const { data } = useGetFilmsQuery();

							return (
								<>
									<h1>Films</h1>
									{data?.data.map((el) => (
										<div key={el.id} style={{ margin: "15px" }}>
											movie title - <b>{el.nameOriginal}</b>
										</div>
									))}
								</>
							);
						};

						const Products = () => {
							const { data } = useGetProductsQuery();

							return (
								<>
									<h1>Products</h1>
									{data?.data.map((el) => (
										<div key={el.id} style={{ margin: "15px" }}>
											title - <b>{el.title}</b>
										</div>
									))}
								</>
							);
						};

						export const App = () => {
							const navigate = useNavigate();

							const dispatch = useDispatch();

							const leaveSiteHandler = () => {
								navigate("/");
								// ❗❗❗XXX❗❗❗
							};

							return (
								<>
									<header style={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid" }}>
										<ul>
											Menu:
											<li>
												<NavLink to={"films"}>Films</NavLink>
											</li>
											<li>
												<NavLink to={"products"}>Products</NavLink>
											</li>
										</ul>
										<button onClick={leaveSiteHandler}>Leave the site</button>
									</header>

									<Routes>
										<Route path={"/"} element={<h1>Home page</h1>} />
										<Route path={"/films"} element={<Films />} />
										<Route path={"/products"} element={<Products />} />
									</Routes>
								</>
							);
						};

// store.ts
						const store = configureStore({
							reducer: { [api.reducerPath]: api.reducer },
							middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
						});

						createRoot(document.getElementById("root")!).render(
							<BrowserRouter>
								<Provider store={store}>
									<App />
								</Provider>
							</BrowserRouter>,
						);

// 📜 Описание:
// Перейди на страницу фильмов и убедись, что фильмы подгрузились
// Перейди на страницу продуктов и убедись, что продукты подгрузились
// Открой redux devtools и убедись, что фильмы и продукты сохранились в кеше

// 🪛 Задача:
// При нажатии на кнопку `Leave the site` необходимо очисть весь RTK query кеш
// Что нужно написать вместо `// ❗❗❗XXX❗❗❗`, чтобы реализовать данную задачу

						<div style={t.completed ? { color: "grey" } : {}} key={t.id}>
								<input type="checkbox" checked={t.completed} />
								<b>Описание</b>: {t.title}
							</div>
						);
					})}
				</>
			}
			{isLoading && <h2>Загрузка...</h2>}
			{isFetching && <h2>👩‍💻 Секретный код: BHOlh#</h2>}
			{isError&& <h2> Error: 👺👺👺</h2>}
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