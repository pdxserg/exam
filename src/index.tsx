import { configureStore, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";

// Slice
type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

const appSlice = createSlice({
	name: "app",
	initialState: {
		status: "idle" as RequestStatus,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(isPending, (state, action) => {
				// "❗X"
				state.status = "loading";
			})
			.addMatcher(isFulfilled, (state) => {
				state.status = "succeeded";
			})
			.addMatcher(isRejected, (state) => {
				state.status = "failed";
			});
	},
	selectors: {
		selectStatus: (state) => state.status,
	},
});

const { selectStatus } = appSlice.selectors;

type Post = {
	body: string;
	id: string;
	title: string;
	userId: string;
};

// Api
const api = createApi({
	reducerPath: "api",
	baseQuery: async (args, api, extraOptions) => {
		await new Promise((resolve) => setTimeout(resolve, 2000)); // Эмуляция задержки

		return fetchBaseQuery({ baseUrl: "https://exams-frontend.kimitsu.it-incubator.io/api/" })(
			args,
			api,
			extraOptions,
		);
	},
	tagTypes: ["Post"],
	endpoints: (builder) => {
		return {
			getPosts: builder.query<Post[], void>({
				query: () => "posts",
				providesTags: ["Post"],
			}),
			updatePost: builder.mutation<Post, { id: string; payload: { title: string; body: string } }>({
				query: ({ id, payload }) => ({
					method: "PUT",
					url: `posts/${id}`,
					body: payload,
				}),
				invalidatesTags: ["Post"],
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

const { useGetPostsQuery, useUpdatePostMutation, useRemovePostMutation } = api;

// Components
const Header = () => (
	<div style={{ width: "100%", background: "gray", border: "none", height: "50px" }}>header</div>
);

const LinearProgress = () => (
	<hr
		style={{
			height: "10px",
			width: "100%",
			background: "lightblue",
			border: "none",
			position: "absolute",
			left: "0px",
			top: "50px",
			right: "0px",
		}}
	/>
);

const App = () => {
	const status = useSelector(selectStatus);

	return (
		<div>
			<Header />
			{status === "loading" && <LinearProgress />}
			<Posts />
		</div>
	);
};

const Posts = () => {
	const { data, isSuccess, isLoading } = useGetPostsQuery();
	const [updatePost] = useUpdatePostMutation();
	const [removePost] = useRemovePostMutation();

	const updatePostHandler = (id: string) => {
		updatePost({ id, payload: { title: "Тестовый title", body: "Тестовое body сообщение" } });
	};

	const deletePostHandler = (id: string) => {
		removePost(id);
	};

	if (isLoading) {
		return <h2>Posts loading...</h2>;
	}

	return (
		<div>
			{isSuccess && (
				<div>
					<h2>Posts</h2>
					{data?.map((el) => {
						return (
							<div key={el.id} style={{ display: "flex", alignItems: "center" }}>
								<div style={{ border: "1px solid", margin: "5px", padding: "5px", width: "200px" }}>
									<p>
										<b>title</b> - {el.title}
									</p>
								</div>
								<button onClick={() => updatePostHandler(el.id)}>Update post</button>
								<button onClick={() => deletePostHandler(el.id)}>Delete post</button>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

// Store
const store = configureStore({
	reducer: {
		[appSlice.name]: appSlice.reducer,
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
// Обновите страницу и обратите внимание, что при загрузке постов отрабатывает для загрузчика:
// 1. LinearProgress (голубая полоска под хедером)
// 2. Posts loading...
// А при обновлении или удалении поста только LinearProgress

// 🪛 Задача:
// Что нужно написать вместо "❗X" для того, чтобы при загрузке постов осталась надпись только
// Posts loading..., а LinearProgress не отображался. Но при этом для обновления или обновления
// поста как и прежде LinearProgress должен отрабатывать