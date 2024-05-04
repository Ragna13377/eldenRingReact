import { XYCoord } from 'react-dnd';
import { EquipmentType, TCardWithParams } from '@shared/types';
import { TSetAvailableCellProps } from '@widgets/Inventory/types';
import { isEquipmentCard } from '@shared/utils/typeGuard';
import { getEnumKeyByValue, throttle } from '@shared/utils/utils';

const setAvailableCellHover = ({
	monitor,
	inventoryRef,
	availableCell,
	setAvailableCell,
	currentCardData,
}: TSetAvailableCellProps) => {
	if (monitor.isOver() && currentCardData) {
		const cardData = (currentCardData as TCardWithParams).card;
		if (isEquipmentCard(cardData)) {
			const key = getEnumKeyByValue(EquipmentType, cardData.equipmentType);
			if (cardData.equipmentType !== EquipmentType.weapon)
				setAvailableCell((prev) => ({ ...prev, [key]: true }));
			else {
				const dropTargetRect =
					inventoryRef.current?.getBoundingClientRect() as DOMRect;
				const clientOffset = monitor.getClientOffset() as XYCoord;
				const middle = dropTargetRect.left + dropTargetRect.width / 2;
				if (clientOffset.x < middle && !availableCell.leftWeapon)
					setAvailableCell((prev) => ({
						...prev,
						leftWeapon: true,
						rightWeapon: false,
					}));
				if (clientOffset.x >= middle && !availableCell.rightWeapon)
					setAvailableCell((prev) => ({
						...prev,
						rightWeapon: true,
						leftWeapon: false,
					}));
			}
		}
	}
};

export const optimizedSetAvailableCellHover = throttle(
	setAvailableCellHover,
	300
);
