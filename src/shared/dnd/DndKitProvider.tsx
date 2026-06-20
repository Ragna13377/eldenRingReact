import {
	DndContext,
	DragOverlay,
	PointerSensor,
	pointerWithin,
	useSensor,
	useSensors,
	type DragCancelEvent,
	type DragEndEvent,
	type DragStartEvent,
	type Modifier,
} from '@dnd-kit/core';
import { clearDraggableCard, setDraggableCard } from '@shared/services/DraggableCard/slice';
import { addInventoryCard } from '@shared/services/Inventory/slice';
import { addPlayerArenaCard } from '@shared/services/PlayerArena/slice';
import { removePlayerHandCard } from '@shared/services/PlayerHand/slice';
import { CardSubType } from '@shared/types/commonTypes';
import type {
	TCardPayload,
	TCardWithParams,
	TClientPosition,
	TInventoryOwner,
} from '@shared/types/utilityTypes';
import CardView from '@widgets/Сard/CardView';
import { type PropsWithChildren, useCallback, useState } from 'react';
import { useDispatch } from '@/app/store';

type TDraggableCardData = {
	card: TCardWithParams;
	subtype: CardSubType;
};

type TDropTargetData =
	| {
			accept: CardSubType;
			type: 'arena';
	  }
	| {
			accept: CardSubType;
			ownerId: TInventoryOwner;
			type: 'inventory';
	  };

const getCursorPosition = (event: DragEndEvent): TClientPosition | null => {
	const translatedRect = event.active.rect.current.translated;
	if (!translatedRect) return null;

	return {
		x: translatedRect.left + translatedRect.width / 2,
		y: translatedRect.top + translatedRect.height / 2,
	};
};

const centerOverlayOnCursor: Modifier = ({ activatorEvent, activeNodeRect, transform }) => {
	if (!(activatorEvent instanceof MouseEvent || activatorEvent instanceof PointerEvent)) {
		return transform;
	}
	if (!activeNodeRect) return transform;

	const grabOffsetX = activatorEvent.clientX - activeNodeRect.left;
	const grabOffsetY = activatorEvent.clientY - activeNodeRect.top;

	return {
		...transform,
		x: transform.x + grabOffsetX - activeNodeRect.width / 2,
		y: transform.y + grabOffsetY - activeNodeRect.height / 2,
	};
};

const setDraggingCursor = (isDragging: boolean) => {
	document.documentElement.classList.toggle('cardDragging', isDragging);
};

const DndKitProvider = ({ children }: PropsWithChildren) => {
	const dispatch = useDispatch();
	const [activeCard, setActiveCard] = useState<TCardWithParams | null>(null);
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 4,
			},
		})
	);

	const resetDragState = useCallback(() => {
		setDraggingCursor(false);
		setActiveCard(null);
		dispatch(clearDraggableCard());
	}, [dispatch]);

	const handleDragStart = useCallback(
		(event: DragStartEvent) => {
			const data = event.active.data.current as TDraggableCardData | undefined;
			if (!data?.card) return;

			setDraggingCursor(true);
			setActiveCard(data.card);
			dispatch(setDraggableCard(data.card));
		},
		[dispatch]
	);

	const handleDragCancel = useCallback(
		(_: DragCancelEvent) => {
			resetDragState();
		},
		[resetDragState]
	);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const cardData = event.active.data.current as TDraggableCardData | undefined;
			const dropData = event.over?.data.current as TDropTargetData | undefined;
			const cursorPosition = getCursorPosition(event);
			const dropTargetRect = event.over?.rect;

			if (
				cardData?.card &&
				dropData &&
				cursorPosition &&
				dropTargetRect &&
				cardData.subtype === dropData.accept
			) {
				const payload: TCardPayload = {
					currentDraggableCard: cardData.card,
					cursorPosition,
					dropTargetRect,
				};

				dispatch(removePlayerHandCard(cardData.card));

				if (dropData.type === 'inventory') {
					dispatch(addInventoryCard({ ...payload, ownerId: dropData.ownerId }));
				} else {
					dispatch(addPlayerArenaCard(payload));
				}
			}

			resetDragState();
		},
		[dispatch, resetDragState]
	);

	return (
		<DndContext
			collisionDetection={pointerWithin}
			onDragCancel={handleDragCancel}
			onDragEnd={handleDragEnd}
			onDragStart={handleDragStart}
			sensors={sensors}
		>
			{children}
			<DragOverlay
				adjustScale={false}
				dropAnimation={{ duration: 420, easing: 'ease-out' }}
				modifiers={[centerOverlayOnCursor]}
				zIndex={2147483647}
			>
				{activeCard ? <CardView {...activeCard} /> : null}
			</DragOverlay>
		</DndContext>
	);
};

export default DndKitProvider;
