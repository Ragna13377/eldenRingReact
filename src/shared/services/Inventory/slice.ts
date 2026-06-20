import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TEquipmentCard, TWeaponCard } from '@shared/types/cardTypes';
import { EquipmentType } from '@shared/types/commonTypes';
import type {
	TCardPayload,
	TCardWithParams,
	TInventory,
	TInventoryEquipment,
	TInventoryOwner,
} from '@shared/types/utilityTypes';
import { isWeaponCard } from '@shared/utils/typeGuard';
import { getEnumKeyByValue, isTwoHandedWeapon } from '@shared/utils/utils';

const createInitialInventory = (): TInventory<TCardWithParams | null> => ({
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
});

const initialState: Record<TInventoryOwner, TInventory<TCardWithParams | null>> = {
	human: createInitialInventory(),
	bot: createInitialInventory(),
};

const InventorySlice = createSlice({
	name: 'inventory',
	initialState,
	reducers: {
		addInventoryCard: (state, action: PayloadAction<TCardPayload>) => {
			const {
				currentDraggableCard,
				dropTargetRect,
				cursorPosition,
				ownerId = 'human',
			} = action.payload;
			if (!currentDraggableCard) return;
			const { card } = currentDraggableCard as { card: TEquipmentCard };
			const inventory = state[ownerId];
			const { equipments } = inventory;
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
						if (isTwoHandedWeapon(equipments.rightWeapon)) equipments.rightWeapon = null;
					} else {
						equipments.rightWeapon = currentDraggableCard;
						if (isTwoHandedWeapon(equipments.leftWeapon)) equipments.leftWeapon = null;
					}
				}
			}
			inventory.score = Object.values(equipments).reduce((acc, el) => {
				if (!el) return acc;
				const { card } = el as { card: TEquipmentCard };
				return acc + card.primaryStats.strength;
			}, 0);
			if (isTwoHandedWeapon(equipments.rightWeapon)) {
				const { card } = equipments.rightWeapon as { card: TWeaponCard };
				inventory.score -= card.primaryStats.strength;
			}
		},
		removeInventoryCard: (
			state,
			action: PayloadAction<{
				ownerId?: TInventoryOwner;
				type: keyof TInventoryEquipment;
			}>
		) => {
			const { ownerId = 'human', type } = action.payload;
			state[ownerId].equipments[type] = null;
		},
		setInventory: (
			_state,
			action: PayloadAction<Record<TInventoryOwner, TInventory<TCardWithParams | null>>>
		) => action.payload,
		resetInventory: () => ({
			human: createInitialInventory(),
			bot: createInitialInventory(),
		}),
	},
	selectors: {
		getInventory: (state) => state.human,
		getInventoryByOwner: (state, ownerId: TInventoryOwner) => state[ownerId],
	},
});

export default InventorySlice.reducer;
export const { addInventoryCard, removeInventoryCard, resetInventory, setInventory } =
	InventorySlice.actions;
export const { getInventory, getInventoryByOwner } = InventorySlice.selectors;
