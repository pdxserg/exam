import { configureStore, nanoid } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

type Post = {
	body: string;
	id: string;
	title: string;
	userId: string;
};

const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" }),
	tagTypes: ["Post"],
	endpoints: (builder) => {
		return {
			getPosts: builder.query<Post[], void>({
				query: () => "posts",
				providesTags: ["Post"],
			}),
			removePost: builder.mutation<{ message: string }, string>({
				query: (id) => ({
					method: "DELETE",
					url: `posts/${id}`,
				}),
				invalidatesTags: ["Post"],
			}),
		};
	},
});

const { useGetPostsQuery, useRemovePostMutation } = api;

// App.tsx
const App = () => {
	const { data: posts } = useGetPostsQuery();
	const [removePost] = useRemovePostMutation();

	const removePostHandler = (id: string) => {
		removePost(nanoid())
			.unwrap()//✅✅✅
			.then(() => {
				alert(`✅ The post was successfully deleted`);
			})
			.catch((err) => {
				alert(`❌ The post was not deleted: ${err.data.errors}`);
			});
	};

	return (
		<>
			{posts?.map((el) => {
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
						<button onClick={() => removePostHandler(el.id)}>x</button>
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
// При нажатии на кнопку удаления поста (х), вы увидите alert с сообщением о том, что пост успешно
// удален.
// Но на самом деле падает ошибка. Откройте панель разработчика и посмотрите network.
// Запрос падает с 400 ошибкой

// 🪛 Задача:
// Что нужно дописать в коде, чтобы в случае ошибки отработал catch и пользователь увидел
// сообщение об ошибке.
// В качестве ответа укажите добавленный вами код
// ❗Чинить удаление поста не нужно