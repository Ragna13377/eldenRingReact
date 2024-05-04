import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from '@/app/store';
import { clearDraggableCard, getDraggableCard } from '@shared/services/DraggableCard/slice';
import { removePlayerHandCard } from '@shared/services/PlayerHand/slice';
import { initialAvailableCellState } from '@widgets/Inventory/constants';
import { CardSubType, TInventory } from '@shared/types';
import { TUseDropInventoryProps } from '@widgets/Inventory/types';
import { optimizedSetAvailableCellHover } from '@widgets/Inventory/utils';
import { addInventoryCard } from '@shared/services/Inventory/slice';

export const useDropInventory = ({ inventoryRef }: TUseDropInventoryProps) => {
	const dispatch = useDispatch();
	const currentCardData = useSelector(getDraggableCard);
	const [availableCell, setAvailableCell] = useState<TInventory<boolean>>(
		initialAvailableCellState
	);
	const [{ isOver, didDrop }, drop] = useDrop({
		accept: CardSubType.equipment,
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			didDrop: monitor.didDrop(),
		}),
		hover: (_, monitor) => {
			optimizedSetAvailableCellHover({
				monitor,
				currentCardData,
				availableCell,
				setAvailableCell,
				inventoryRef,
			});
		},
	});
	drop(inventoryRef);
	useEffect(() => {
		if (didDrop && currentCardData) {
			dispatch(removePlayerHandCard(currentCardData));
			dispatch(addInventoryCard(currentCardData));
			dispatch(clearDraggableCard());
		}
	}, [didDrop, dispatch, currentCardData]);
	return {
		availableCell,
		setAvailableCell,
		isOver,
	};
};
