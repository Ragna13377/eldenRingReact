import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	TAddCardPayload,
	TCardWithParams,
	TInventory,
} from '@shared/types';

const initialState: TInventory<TCardWithParams | null> = {
	helmet: null,
	amulet: null,
	leftWeapon: null,
	rightWeapon: null,
	armor: null,
	boots: null,
};
const InventorySlice = createSlice({
	name: 'inventory',
	initialState,
	reducers: {
		addInventoryCard: (state, action: PayloadAction<TAddCardPayload>) => {
			const { currentDraggableCard, dropTargetRect, cursorPosition } =
				action.payload;
			if (currentDraggableCard) {

			}
			// if (currentAvailableCell) {
			// 	return {
			// 		...state,
			// 		[currentAvailableCell]: currentDraggableCard,
			// 	};
			// }
		},
		removeInventoryCard: (state, action) => ({
			...state,
			[action.payload.type]: null,
		}),
	},
	selectors: {
		getInventory: (state) => state,
	},
});

export default InventorySlice.reducer;
export const { addInventoryCard, removeInventoryCard } = InventorySlice.actions;
export const { getInventory } = InventorySlice.selectors;
