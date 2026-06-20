import {
	useDndMonitor,
	useDroppable,
	type DragCancelEvent,
	type DragEndEvent,
	type DragMoveEvent,
} from '@dnd-kit/core';
import { getDraggableCard } from '@shared/services/DraggableCard/slice';
import { CardSubType } from '@shared/types/commonTypes';
import type {
	TCardWithParams,
	TClientPosition,
	TInventoryEquipment,
} from '@shared/types/utilityTypes';
import { initialAvailableCellState } from '@widgets/Inventory/constants';
import type { TUseDropInventoryProps } from '@widgets/Inventory/types';
import { setAvailableCellHover } from '@widgets/Inventory/utils';
import { useCallback, useState } from 'react';
import { useSelector } from '@/app/store';

type TDraggableCardData = {
	card?: TCardWithParams;
};

const getActivatorClientOffset = (event: DragMoveEvent): TClientPosition | null => {
	const { activatorEvent, delta } = event;

	if (
		!(
			activatorEvent instanceof MouseEvent ||
			activatorEvent instanceof PointerEvent ||
			activatorEvent instanceof TouchEvent
		)
	)
		return null;

	const clientPosition =
		activatorEvent instanceof TouchEvent
			? activatorEvent.touches[0]
			: activatorEvent;
	const clientX = clientPosition?.clientX;
	const clientY = clientPosition?.clientY;

	if (clientX === undefined || clientY === undefined) return null;
	return {
		x: clientX + delta.x,
		y: clientY + delta.y,
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
	const { isOver, setNodeRef } = useDroppable({
		id: `inventory-${ownerId}`,
		data: {
			accept: CardSubType.equipment,
			ownerId,
			type: 'inventory',
		},
		disabled: !isDropEnabled,
	});
	const resetAvailableCell = useCallback(() => {
		setAvailableCell((prev) =>
			Object.values(prev).some(Boolean) ? initialAvailableCellState : prev
		);
	}, []);

	useDndMonitor({
		onDragMove(event) {
			const isInventoryOver = event.over?.id === `inventory-${ownerId}`;
			const draggedCard =
				(event.active.data.current as TDraggableCardData | undefined)?.card ??
				currentDraggableCard;

			if (!isDropEnabled || !isInventoryOver) {
				resetAvailableCell();
				return;
			}

			setAvailableCellHover({
				availableCell,
				clientOffset: getActivatorClientOffset(event),
				currentDraggableCard: draggedCard ?? null,
				inventoryRef,
				isOver: true,
				setAvailableCell,
			});
		},
		onDragOver(event: DragMoveEvent) {
			const isInventoryOver = event.over?.id === `inventory-${ownerId}`;
			if (!isInventoryOver) resetAvailableCell();
		},
		onDragEnd(_: DragEndEvent) {
			resetAvailableCell();
		},
		onDragCancel(_: DragCancelEvent) {
			resetAvailableCell();
		},
	});

	return {
		availableCell,
		isOver,
		setAvailableCell,
		setNodeRef,
	};
};
