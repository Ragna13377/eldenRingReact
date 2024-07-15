import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isTwoHandedWeapon, getEnumKeyByValue } from '@shared/utils/utils';
import { isWeaponCard } from '@shared/utils/typeGuard';
import {
	TCardPayload,
	TCardWithParams,
	TInventory,
	TInventoryEquipment,
} from '@shared/types/utilityTypes';
import { EquipmentType } from '@shared/types/commonTypes';
import { TEquipmentCard, TWeaponCard } from '@shared/types/cardTypes';

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
		addInventoryCard: (state, action: PayloadAction<TCardPayload>) => {
			const { currentDraggableCard, dropTargetRect, cursorPosition } =
				action.payload;
			if (!currentDraggableCard) return;
			const { card } = currentDraggableCard as { card: TEquipmentCard };
			const { equipments } = state;
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
			state.score = Object.values(equipments).reduce((acc, el) => {
				if (!el) return acc;
				const { card } = el as { card: TEquipmentCard };
				return acc + card.primaryStats.strength;
			}, 0);
			if (isTwoHandedWeapon(equipments.rightWeapon)) {
				const { card } = equipments.rightWeapon as { card: TWeaponCard };
				state.score -= card.primaryStats.strength;
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
