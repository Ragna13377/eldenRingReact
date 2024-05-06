import { useEffect, useState } from 'react';
import { useSelector } from '@/app/store';
import { getDraggableCard } from '@shared/services/DraggableCard/slice';
import { addInventoryCard } from '@shared/services/Inventory/slice';
import { initialAvailableCellState } from '@widgets/Inventory/constants';
import { CardSubType, TDropParams, TInventory } from '@shared/types';
import { TUseDropInventoryProps } from '@widgets/Inventory/types';
import { optimizedSetAvailableCellHover } from '@widgets/Inventory/utils';
import { useCustomDrop } from '@shared/hooks/useCustomDrop';
import { useDropReplaceCard } from '@shared/hooks/useDropReplaceCard';

export const useDropInventory = ({ inventoryRef }: TUseDropInventoryProps) => {
	const currentDraggableCard = useSelector(getDraggableCard);
	const [inventoryDropResult, setInventoryDropResult] = useState<TDropParams>({
		isDrop: false,
		getClientOffset: null,
	});
	const [availableCell, setAvailableCell] = useState<TInventory<boolean>>(
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
