import { useCustomDrop } from '@shared/hooks/useCustomDrop';
import { useDropReplaceCard } from '@shared/hooks/useDropReplaceCard';
import { getDraggableCard } from '@shared/services/DraggableCard/slice';
import { addInventoryCard } from '@shared/services/Inventory/slice';
import { CardSubType } from '@shared/types/commonTypes';
import type { TDropParams, TInventoryEquipment } from '@shared/types/utilityTypes';
import { initialAvailableCellState } from '@widgets/Inventory/constants';
import type { TUseDropInventoryProps } from '@widgets/Inventory/types';
import { optimizedSetAvailableCellHover } from '@widgets/Inventory/utils';
import { useState } from 'react';
import { useSelector } from '@/app/store';

export const useDropInventory = ({ inventoryRef }: TUseDropInventoryProps) => {
	const currentDraggableCard = useSelector(getDraggableCard);
	const [inventoryDropResult, setInventoryDropResult] = useState<TDropParams>({
		isDrop: false,
		getClientOffset: null,
	});
	const [availableCell, setAvailableCell] = useState<TInventoryEquipment>(
		initialAvailableCellState
	);
	const { isOver } = useCustomDrop({
		accept: CardSubType.equipment,
		dropHandler: setInventoryDropResult,
		dropRef: inventoryRef,
		hoverHandler: (monitor) => {
			optimizedSetAvailableCellHover({
				monitor,
				currentDraggableCard,
				availableCell,
				setAvailableCell,
				inventoryRef,
			});
		},
	});
	useDropReplaceCard(
		{
			dropParams: inventoryDropResult,
			setDropParams: setInventoryDropResult,
			refObject: inventoryRef,
			currentDraggableCard,
			addCardAction: addInventoryCard,
		},
		() => {
			setAvailableCell(initialAvailableCellState);
		}
	);
	return {
		availableCell,
		setAvailableCell,
		isOver,
	};
};
