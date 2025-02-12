import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

type Comment = {
	postId: string;
	id: string;
	name: string;
	email: string;
	body: string;
};

// Api
const api = createApi({
	reducerPath: "commentsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" }),
	endpoints: (builder) => {
		return {
			getComments: builder.query<Comment[], void>({
				query: () => ({
					url: `comments`,
					method: "GET",
				}),

			}),
		};
	},
});

const { useGetCommentsQuery } = api;

// App.tsx
const App = () => {
	const { data } = useGetCommentsQuery();

	return (
		<>
			{data?.map((el) => {
				return (
					<div key={el.id} style={{ border: "1px solid", margin: "5px", padding: "5px" }}>
						<p>body - {el.body}</p>
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
// Белый экран. Откройте панель разработчика и проанализируйте в чем ошибка

// 🪛 Задача:
// Что нужно написать вместо  `// ❗❗❗XXX❗❗❗` чтобы на экране отобразились комментарии
// В качестве ответа укажите написанный вами код
// ❗Типизацию указывать обязательно