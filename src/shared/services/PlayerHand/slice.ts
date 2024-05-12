import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCardWithParams } from '@shared/types/utilityTypes';

const initialState: TCardWithParams[] = [];
const playerHandSlice = createSlice({
	name: 'playerHand',
	initialState,
	reducers: {
		setHand: (state, action: PayloadAction<TCardWithParams[]>) => [
			...action.payload,
		],
		addPlayerHandCard: (state, action: PayloadAction<TCardWithParams>) => [
			...state,
			action.payload,
		],
		removePlayerHandCard: (state, action: PayloadAction<TCardWithParams>) =>
			state.filter((card) => card.cardKey !== action.payload.cardKey),
	},
	selectors: {
		getPlayerHandCard: (state) => state,
	},
});
export default playerHandSlice.reducer;
export const { setHand, addPlayerHandCard, removePlayerHandCard } =
	playerHandSlice.actions;
export const { getPlayerHandCard } = playerHandSlice.selectors;
