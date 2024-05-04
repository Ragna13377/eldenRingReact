import { TCardWithParams } from '@shared/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TCardWithParams | null = null;
const draggableCardSlice = createSlice({
	name: 'draggableCard',
	initialState,
	reducers: {
		setDraggableCard: (_, action) => action.payload,
		clearDraggableCard: () => null,
	},
	selectors: {
		getDraggableCard: (state) => state,
	},
});

export default draggableCardSlice.reducer;
export const { setDraggableCard, clearDraggableCard } = draggableCardSlice.actions;
export const { getDraggableCard } = draggableCardSlice.selectors;
