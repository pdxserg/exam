import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch } from "react-redux";

type User = {
	id: string;
	name: string;
	age: number;
};

type UsersResponse = {
	items: User[];
	totalCount: number;
};

// Api
const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" }),
	endpoints: (builder) => {
		return {
			getUsers: builder.query<UsersResponse, void>({
				query: () => "users",
			}),
		};
	},
});

const { useGetUsersQuery } = api;

// Users.tsx
const Users = () => {
	const { data } = useGetUsersQuery();

	const dispatch = useAppDispatch();

	const addSmileHandler = (id: string) => {
		const smile = "😁";
		// ❗❗❗XXX❗❗❗
	};

	return (
		<>
			<h1>Users</h1>
			{data?.items.map((el) => (
				<div key={el.id}>
					name - <b>{el.name}</b>
					<button onClick={() => addSmileHandler(el.id)}>Add smile</button>
				</div>
			))}
		</>
	);
};

// store.ts
const store = configureStore({
	reducer: { [api.reducerPath]: api.reducer },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

type AppDispatch = typeof store.dispatch;
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<Users />
	</Provider>,
);

// 📜 Описание:
// Откройте redux devtools и убедитесь, что данные из запроса хранятся в кеше
// http://surl.li/veofpd
// 🪛 Задача:
// При нажатии на кнопку `Add smile` необходимо изменить данные в кеше и добавить к имени переменную
// smile
// Результат: http://surl.li/kgmhtn
// Что нужно написать вместо `// ❗❗❗XXX❗❗❗`, чтобы реализовать данную задачу
// ❗Изменение стейта должно быть написано мутабельным образом
// ❗updateRecipe коллбек в качетстве аргумента принимает стейт. Назовите эту переменную state