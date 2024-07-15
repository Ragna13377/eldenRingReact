import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isTwoHandedWeapon, getEnumKeyByValue } from '@shared/utils/utils';
import { isWeaponCard } from '@shared/utils/typeGuard';
import {
	TAddCardPayload,
	TCardWithParams,
	TInventory, TInventoryEquipment,
} from '@shared/types/utilityTypes';
import { EquipmentType } from '@shared/types/commonTypes';
import { TEquipmentCard } from '@shared/types/cardTypes';

const initialState: TInventory<TCardWithParams | null> = {
	score: 0,
	effect: '',
	equipments: {
		helmet: null,
		amulet: null,
		leftWeapon: null,
		rightWeapon: null,
		armor: null,
		boots: null,
	},
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
			const { equipments } = state;
			state.score += card.primaryStats.strength;
			if (!isWeaponCard(card)) {
				const key = getEnumKeyByValue(
					EquipmentType,
					card.equipmentType
				) as keyof TInventoryEquipment;
				equipments[key] = currentDraggableCard;
			} else {
				if (isTwoHandedWeapon(currentDraggableCard)) {
					equipments.leftWeapon = equipments.rightWeapon = currentDraggableCard;
				} else {
					const middle = dropTargetRect.left + dropTargetRect.width / 2;
					if (cursorPosition.x < middle) {
						equipments.leftWeapon = currentDraggableCard;
						if (isTwoHandedWeapon(equipments.rightWeapon))
							equipments.rightWeapon = null;
					} else {
						equipments.rightWeapon = currentDraggableCard;
						if (isTwoHandedWeapon(equipments.leftWeapon))
							equipments.leftWeapon = null;
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
