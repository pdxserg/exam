import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, NavLink, Route, Routes } from "react-router";

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

type Post = {
	body: string;
	id: string;
	title: string;
	userId: string;
};

// Api
const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" }),
	tagTypes: ["Film", "Product", "Post"],
	endpoints: (builder) => {
		return {
			getFilms: builder.query<FilmsResponse, void>({
				query: () => "films",
				providesTags: ["Film"],
			}),
			getProducts: builder.query<ProductsResponse, void>({
				query: () => "products",
				providesTags: ["Product"],
			}),
			getPosts: builder.query<Post[], void>({
				query: () => "posts",
				providesTags: ["Post"],
			}),
		};
	},
});

const { useGetFilmsQuery, useGetProductsQuery, useGetPostsQuery } = api;

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

const Posts = () => {
	const { data } = useGetPostsQuery();

	const dispatch = useDispatch();

	const clearCacheHandler = () => {
		// ❗❗❗XXX❗❗❗
	};

	return (
		<>
			<h1>Posts</h1>
			<button onClick={clearCacheHandler}>I clear cache. Mu-ha-ha 👺</button>
			{data?.map((el) => (
				<div key={el.id} style={{ margin: "15px" }}>
					title - <b>{el.title}</b>
				</div>
			))}
		</>
	);
};

export const App = () => {
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
					<li>
						<NavLink to={"posts"}>Posts</NavLink>
					</li>
				</ul>
			</header>

			<Routes>
				<Route path={"/"} element={<h1>Home page</h1>} />
				<Route path={"/films"} element={<Films />} />
				<Route path={"/products"} element={<Products />} />
				<Route path={"/posts"} element={<Posts />} />
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
// Перейди на страницу постов и убедись, что посты подгрузились
// Открой redux devtools и убедись, что фильмы, продукты и посты сохранились в кеше

// 🪛 Задача:
// На странице постов есть кнопка `I clear cache. Mu-ha-ha 👺`. При нажатии на эту кнопку
// необходимо зачистить кеш фильмов и продуктов
// Что нужно написать вместо `// ❗❗❗XXX❗❗❗`, чтобы реализовать данную задачу