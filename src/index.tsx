import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";

// slice
const slice = createSlice({
	name: "tickets",
	initialState: [
		{ id: 1, event: "Concert", available: true, price: 100 },
		{ id: 2, event: "Movie", available: false, price: 50 },
		{ id: 3, event: "Theater", available: true, price: 75 },
	],
	reducers: {
		applyDiscount: (state, action) => {
			state.forEach(e=>e.price=e.price+(e.price*action.payload)/100)
		},
	},
});

const { applyDiscount } = slice.actions;

// App.tsx
const App = () => {
	const tickets = useSelector((state: RootState) => state.tickets);
	const dispatch = useDispatch();

	const handleDiscount = (discount: number) => {
		dispatch(applyDiscount(discount));
	};

	return (
		<div>
			<button onClick={() => handleDiscount(20)}>20% Discount</button>
			<button onClick={() => handleDiscount(50)}>50% Discount</button>
			<button onClick={() => handleDiscount(80)}>80% Discount</button>
			<ul>
				{tickets.map((ticket) => (
					<li key={ticket.id}>
            <span>
              {ticket.event} ({ticket.available ? "Available" : "Sold Out"}) - $
	            {ticket.price.toFixed(2)}
            </span>
					</li>
				))}
			</ul>
		</div>
	);
};

// store.ts
export const store = configureStore({
	reducer: {
		tickets: slice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

// main.ts
createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<App />
	</Provider>,
);

// 📜 Описание:
// При нажатии на кнопки с 20%, 50% или 80% скидками цены всех билетов должны уменьшиться на
// указанный процент.

// 🪛 Задача:
// Перепишите изменение стейта так, чтобы цена каждого билета уменьшалась на указанный процент.
// В качестве ответа укажите исправленную строку кода.
// ❗Операция должна быть реализована мутабельным образом.
// ❗Не используйте деструктуризацию action.payload (const {id} = action.payload)
// ❗Не создавайте переменные из action.payload (const id = action.payload.id)