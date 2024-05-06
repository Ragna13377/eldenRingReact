import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAddCardPayload, TCardWithParams } from '@shared/types';
import {
	cardWidth,
	maxCardCount,
} from '@shared/services/PlayerArena/constants';

const initialState: TCardWithParams[] = [];
const playerArenaSlice = createSlice({
	name: 'playerArena',
	initialState,
	reducers: {
		addPlayerArenaCard(state, action: PayloadAction<TAddCardPayload>) {
			const { currentDraggableCard, dropTargetRect, cursorPosition } =
				action.payload;
			if (currentDraggableCard) {
				const boundary = (cardWidth * (maxCardCount - state.length + 1)) / 2;
				if (
					state.length === 0 ||
					(cursorPosition.x > dropTargetRect.left &&
						cursorPosition.x <= dropTargetRect.left + boundary)
				)
					return [currentDraggableCard, ...state];
				else if (
					cursorPosition.x <= dropTargetRect.right &&
					cursorPosition.x > dropTargetRect.right - boundary
				)
					return [...state, currentDraggableCard];
				else {
					const difference = cursorPosition.x - dropTargetRect.left - boundary;
					const position = Math.ceil(difference / cardWidth);
					return [
						...state.slice(0, position),
						currentDraggableCard,
						...state.slice(position),
					];
				}
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
