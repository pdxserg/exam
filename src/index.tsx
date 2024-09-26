import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Types
type PhotoType = {
	albumId: string;
	id: string;
	title: string;
	url: string;
};

// Api
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/" });

const photosAPI = {
	getPhotos() {
		return instance.get<PhotoType[]>("pictures?delay=3");
	},
};

// Reducer
const initState = {
	isLoading: false,
	error: null as string | null,
	photos: [] as PhotoType[],
};

type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
	switch (action.type) {
		case "PHOTO/GET-PHOTOS":
			return { ...state, photos: action.photos };
		case "PHOTO/IS-LOADING":
			return { ...state, isLoading: action.isLoading };
		case "PHOTO/SET-ERROR":
			return { ...state, error: action.error };
		default:
			return state;
	}
};

const getPhotosAC = (photos: PhotoType[]) => ({ type: "PHOTO/GET-PHOTOS", photos }) as const;
const setLoadingAC = (isLoading: boolean) => ({ type: "PHOTO/IS-LOADING", isLoading }) as const;
const setError = (error: string | null) => ({ type: "PHOTO/SET-ERROR", error }) as const;
type ActionsType =
	| ReturnType<typeof getPhotosAC>
	| ReturnType<typeof setLoadingAC>
	| ReturnType<typeof setError>;

const getPhotosTC = (): AppThunk => (dispatch) => {
	dispatch(setLoadingAC(true));
	photosAPI
		.getPhotos()
		.then((res) => {
			dispatch(getPhotosAC(res.data));
		})
		.catch((e: AxiosError) => {
			dispatch(setError(e.message));
		});
};

// Store
const rootReducer = combineReducers({
	app: appReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Loader
export const Loader = () => {
	return <h1>Loading ...</h1>;
};

// App
const App = () => {
	const dispatch = useAppDispatch();

	const photos = useAppSelector((state) => state.app.photos);
	const isLoading = useAppSelector((state) => state.app.isLoading);
	const error = useAppSelector((state) => state.app.error);

	const getPhotosHandler = () => {
		dispatch(getPhotosTC());
	};

	return (
		<>
			<h1>📸 Фото</h1>
			<h2 style={{ color: "red" }}>{!!error && error}</h2>
			{isLoading && <Loader />}
			<button onClick={getPhotosHandler}>Подгрузить фотографии</button>
			<div style={{ display: "flex", gap: "20px", margin: "20px" }}>
				{photos.map((p) => {
					return (
						<div key={p.id}>
							<b>title</b>: {p.title}
							<div>
								<img src={p.url} alt="" />
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<Provider store={store}>
		<App />
	</Provider>,
);

// 📜 Описание:
// При нажатии на кнопку "Подгрузить фотографии" появляется Loading... и сообщение об ошибке.
// Ваша задача состоит в том, чтобы спрятать Loader независимо от того, как завершится запрос на сервер.
// Т.е. если ответ придет успешный - Loader убираем
//      если ответ придет с ошибкой - Loader тоже убираем.
// Напишите код, с помощью которого можно реализовать данную задачу
// В качестве ответа напишите строку кода.

// 🖥 Пример ответа: .then(() =>  dispatch(getPhotosAC(res.data)))