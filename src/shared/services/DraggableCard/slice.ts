import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCardWithParams } from '@shared/types/utilityTypes';

const initialState: { data: TCardWithParams | null } = {
	data: null,
};
const draggableCardSlice = createSlice({
	name: 'draggableCard',
	initialState,
	reducers: {
		setDraggableCard: (state, action: PayloadAction<TCardWithParams>) => {
			state.data = action.payload;
		},
		clearDraggableCard: (state) => {
			state.data = null;
		},
	},
	selectors: {
		getDraggableCard: (state) => state.data,
	},
});

export default draggableCardSlice.reducer;
export const { setDraggableCard, clearDraggableCard } =
	draggableCardSlice.actions;
export const { getDraggableCard } = draggableCardSlice.selectors;
