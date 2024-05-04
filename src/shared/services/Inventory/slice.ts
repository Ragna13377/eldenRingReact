import { createSlice } from '@reduxjs/toolkit';
import {
	EquipmentType,
	TCardWithParams,
	TEquipmentCard,
	TInventory,
} from '@shared/types';
import { getEnumKeyByValue } from '@shared/utils/utils';

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
		addInventoryCard: (state, action) => {
			const { card } = action.payload;
			const { equipmentType } = card as TEquipmentCard;
			return {
				...state,
				[getEnumKeyByValue(EquipmentType, equipmentType)]: action.payload,
			};
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
