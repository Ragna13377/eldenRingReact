import { EquipmentType } from '@shared/types/commonTypes';
import type { TInventoryEquipment } from '@shared/types/utilityTypes';
import { isEquipmentCard, isWeaponCard } from '@shared/utils/typeGuard';
import { getEnumKeyByValue, throttle } from '@shared/utils/utils';
import type { TSetAvailableCellProps } from '@widgets/Inventory/types';
import type { XYCoord } from 'react-dnd';

const setAvailableCellHover = ({
	monitor,
	inventoryRef,
	availableCell,
	setAvailableCell,
	currentDraggableCard,
}: TSetAvailableCellProps) => {
	if (
		!monitor.isOver() ||
		!currentDraggableCard ||
		!isEquipmentCard(currentDraggableCard.card)
	)
		return;
	const { card } = currentDraggableCard;
	const updateState: Partial<TInventoryEquipment> = {};
	if (!isWeaponCard(card)) {
		const key = getEnumKeyByValue(
			EquipmentType,
			card.equipmentType
		) as keyof TInventoryEquipment;
		updateState[key] = true;
	} else {
		if (card.hands === 2) {
			updateState.leftWeapon = true;
			updateState.rightWeapon = true;
		} else {
			const dropTargetRect = inventoryRef.current?.getBoundingClientRect() as DOMRect;
			const clientOffset = monitor.getClientOffset() as XYCoord;
			const middle = dropTargetRect.left + dropTargetRect.width / 2;
			if (clientOffset.x < middle && !availableCell.leftWeapon) {
				updateState.leftWeapon = true;
				updateState.rightWeapon = false;
			}
			if (clientOffset.x >= middle && !availableCell.rightWeapon) {
				updateState.rightWeapon = true;
				updateState.leftWeapon = false;
			}
		}
	}
	if (Object.keys(updateState).length > 0) {
		setAvailableCell((prev) => ({ ...prev, ...updateState }));
	}
};

export const optimizedSetAvailableCellHover = throttle(setAvailableCellHover, 200);
