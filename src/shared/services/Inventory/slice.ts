import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isTwoHandedWeapon, getEnumKeyByValue } from '@shared/utils/utils';
import { isWeaponCard } from '@shared/utils/typeGuard';
import {
	TAddCardPayload,
	TCardWithParams,
	TInventory,
} from '@shared/types/utilityTypes';
import { EquipmentType } from '@shared/types/commonTypes';
import { TEquipmentCard } from '@shared/types/cardTypes';

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
			if (!currentDraggableCard) return;
			const { card } = currentDraggableCard as { card: TEquipmentCard };
			if (!isWeaponCard(card)) {
				const key = getEnumKeyByValue(
					EquipmentType,
					card.equipmentType
				) as keyof TInventory<TCardWithParams | null>;
				state[key] = currentDraggableCard;
			} else {
				if (card.hands === 2) {
					state.leftWeapon = state.rightWeapon = currentDraggableCard;
				} else {
					const middle = dropTargetRect.left + dropTargetRect.width / 2;
					if (cursorPosition.x < middle) {
						state.leftWeapon = currentDraggableCard;
						if (isTwoHandedWeapon(state.rightWeapon)) state.rightWeapon = null;
					} else {
						state.rightWeapon = currentDraggableCard;
						if (isTwoHandedWeapon(state.leftWeapon)) state.leftWeapon = null;
					}
				}
			}
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
