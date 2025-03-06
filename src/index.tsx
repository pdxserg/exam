import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

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
	endpoints: (builder) => {
		return {
			getPosts: builder.query<Post[], void>({
				query: () => "posts",
			}),
			//❗При написании типизации соблюдайте порядок аргументов как и при вызове функции updatePost
			// ❗❗❗XXX❗❗❗
		};
	},
});

const { useGetPostsQuery, useUpdatePostMutation } = api;

// App.tsx
const App = () => {
	const { data } = useGetPostsQuery();
	const [updatePost] = useUpdatePostMutation();

	const updatePostHandler = (id: string) => {
		updatePost({ id, payload: { title: "Тестовый title", body: "Тестовое body сообщение" } });
	};

	return (
		<>
			{data?.map((el) => {
				return (
					<div style={{ display: "flex", alignItems: "center" }}>
						<div
							key={el.id}
							style={{ border: "1px solid", margin: "5px", padding: "5px", width: "200px" }}
						>
							<p>
								<b>title</b> - {el.title}
							</p>
						</div>
						<button onClick={() => updatePostHandler(el.id)}>Update post</button>
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
// Приложение падает с ошибкой.

// 🪛 Задача:
// Что нужно написать вместо `// ❗❗❗XXX❗❗❗` для реализации обновления поста
// В качестве ответа укажите написанный вами код
// ❗Автоматическое получение данных реализовывать не надо
// ❗Типизацию указывать обязательно