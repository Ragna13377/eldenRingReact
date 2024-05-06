import { XYCoord } from 'react-dnd';
import { EquipmentType, TInventory } from '@shared/types';
import { TSetAvailableCellProps } from '@widgets/Inventory/types';
import { isEquipmentCard } from '@shared/utils/typeGuard';
import { getEnumKeyByValue, throttle } from '@shared/utils/utils';
import { initialAvailableCellState } from '@widgets/Inventory/constants';

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
	if (card.equipmentType !== EquipmentType.weapon) {
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
