import { useDndContext, useDroppable } from '@dnd-kit/core';
import { getDraggableCard } from '@shared/services/DraggableCard/slice';
import { CardSubType } from '@shared/types/commonTypes';
import type {
	TClientPosition,
	TInventoryEquipment,
} from '@shared/types/utilityTypes';
import { initialAvailableCellState } from '@widgets/Inventory/constants';
import type { TUseDropInventoryProps } from '@widgets/Inventory/types';
import { optimizedSetAvailableCellHover } from '@widgets/Inventory/utils';
import { useEffect, useState } from 'react';
import { useSelector } from '@/app/store';

const getActiveClientOffset = (
	active: ReturnType<typeof useDndContext>['active']
): TClientPosition | null => {
	const translatedRect = active?.rect.current.translated;
	if (!translatedRect) return null;

	return {
		x: translatedRect.left + translatedRect.width / 2,
		y: translatedRect.top + translatedRect.height / 2,
	};
};

export const useDropInventory = ({
	inventoryRef,
	ownerId,
	isDropEnabled = true,
}: TUseDropInventoryProps) => {
	const currentDraggableCard = useSelector(getDraggableCard);
	const [availableCell, setAvailableCell] = useState<TInventoryEquipment>(
		initialAvailableCellState
	);
	const { active } = useDndContext();
	const { isOver, setNodeRef } = useDroppable({
		id: `inventory-${ownerId}`,
		data: {
			accept: CardSubType.equipment,
			ownerId,
			type: 'inventory',
		},
		disabled: !isDropEnabled,
	});
	const clientOffset = getActiveClientOffset(active);

	useEffect(
		() =>
			optimizedSetAvailableCellHover({
				availableCell,
				clientOffset,
				currentDraggableCard,
				inventoryRef,
				isOver,
				setAvailableCell,
			}),
		[availableCell, clientOffset, currentDraggableCard, inventoryRef, isOver]
	);

	return {
		availableCell,
		isOver,
		setAvailableCell,
		setNodeRef,
	};
};
