import { createSlice } from '@reduxjs/toolkit';
import { TCardWithParams } from '@shared/types';

const initialState: TCardWithParams[] = [];
const playerHandSlice = createSlice({
	name: 'playerHand',
	initialState,
	reducers: {
		setHand: (state, action) => [...action.payload],
		addPlayerHandCard: (state, action) => [...state, action.payload],
		removePlayerHandCard: (state, action) =>
			state.filter((card) => card.cardKey !== action.payload),
	},
	selectors: {
		getPlayerHandCard: (state) => state,
	},
});
export default playerHandSlice.reducer;
export const { setHand, addPlayerHandCard, removePlayerHandCard } =
	playerHandSlice.actions;
export const { getPlayerHandCard } = playerHandSlice.selectors;
