import { XYCoord } from 'react-dnd';
import { TInventory } from '@shared/types/utilityTypes';
import { EquipmentType } from '@shared/types/commonTypes';
import { TSetAvailableCellProps } from '@widgets/Inventory/types';
import { isEquipmentCard, isWeaponCard } from '@shared/utils/typeGuard';
import { getEnumKeyByValue, throttle } from '@shared/utils/utils';

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
	const updateState: Partial<TInventory<boolean>> = {};
	if (isWeaponCard(card)) {
		const key = getEnumKeyByValue(
			EquipmentType,
			card.equipmentType
		) as keyof TInventory<boolean>;
		if (!availableCell[key]) updateState[key] = true;
	} else {
		const dropTargetRect =
			inventoryRef.current?.getBoundingClientRect() as DOMRect;
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
	if (Object.keys(updateState).length > 0) {
		setAvailableCell((prev) => ({ ...prev, ...updateState }));
	}
};

export const optimizedSetAvailableCellHover = throttle(
	setAvailableCellHover,
	300
);
