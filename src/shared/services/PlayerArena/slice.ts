import { createSlice } from '@reduxjs/toolkit';
import { TCardWithParams } from '@shared/types';
import {
	cardWidth,
	maxCardCount,
} from '@shared/services/PlayerArena/constants';

const initialState: TCardWithParams[] = [];
const playerArenaSlice = createSlice({
	name: 'playerArena',
	initialState,
	reducers: {
		addPlayerArenaCard(state, action) {
			const { currentCardData, dropTargetRect, cursorPosition } =
				action.payload;
			const boundary = (cardWidth * (maxCardCount - state.length + 1)) / 2;
			if (
				state.length === 0 ||
				(cursorPosition.x > dropTargetRect.left &&
					cursorPosition.x <= dropTargetRect.left + boundary)
			)
				return [currentCardData, ...state];
			else if (
				cursorPosition.x <= dropTargetRect.right &&
				cursorPosition.x > dropTargetRect.right - boundary
			)
				return [...state, currentCardData];
			else {
				const difference = cursorPosition.x - dropTargetRect.left - boundary;
				const position = Math.ceil(difference / cardWidth);
				return [
					...state.slice(0, position),
					currentCardData,
					...state.slice(position),
				];
			}
		},
		removePlayerArenaCard(state, action) {
			return state.filter((card) => card.cardKey !== action.payload);
		},
	},
	selectors: {
		getPlayerArenaCard: (state) => state,
	},
});
export default playerArenaSlice.reducer;
export const { addPlayerArenaCard, removePlayerArenaCard } =
	playerArenaSlice.actions;
export const { getPlayerArenaCard } = playerArenaSlice.selectors;
