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
import { addInventoryCard, getInventoryByOwner } from '@shared/services/Inventory/slice';
import { addPlayerArenaCard } from '@shared/services/PlayerArena/slice';
import { addPlayerHandCard, removePlayerHandCard } from '@shared/services/PlayerHand/slice';
import { CardSubType, EquipmentType } from '@shared/types/commonTypes';
import type {
	TCardPayload,
	TCardWithParams,
	TClientPosition,
	TInventory,
	TInventoryEquipment,
	TInventoryOwner,
} from '@shared/types/utilityTypes';
import { isEquipmentCard, isWeaponCard } from '@shared/utils/typeGuard';
import { getEnumKeyByValue, isTwoHandedWeapon } from '@shared/utils/utils';
import CardView from '@widgets/Сard/CardView';
import { type PropsWithChildren, useCallback, useState } from 'react';
import { useDispatch, useSelector } from '@/app/store';

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

const uniqueCards = (cards: Array<TCardWithParams | null>) => {
	const seen = new Set<string>();
	return cards.filter((card): card is TCardWithParams => {
		if (!card || seen.has(card.cardKey)) return false;
		seen.add(card.cardKey);
		return true;
	});
};

const getReplacedInventoryCards = (
	payload: TCardPayload,
	inventory: TInventory<TCardWithParams | null>
) => {
	const { currentDraggableCard, cursorPosition, dropTargetRect } = payload;
	if (!currentDraggableCard) return [];
	const { card } = currentDraggableCard;
	const { equipments } = inventory;
	if (!isEquipmentCard(card)) return [];

	if (!isWeaponCard(card)) {
		const key = getEnumKeyByValue(
			EquipmentType,
			card.equipmentType
		) as keyof TInventoryEquipment;
		return uniqueCards([equipments[key]]);
	}

	if (isTwoHandedWeapon(currentDraggableCard)) {
		return uniqueCards([equipments.leftWeapon, equipments.rightWeapon]);
	}

	const middle = dropTargetRect.left + dropTargetRect.width / 2;
	const targetSlot = cursorPosition.x < middle ? 'leftWeapon' : 'rightWeapon';
	const oppositeSlot = targetSlot === 'leftWeapon' ? 'rightWeapon' : 'leftWeapon';
	const replacedCards = [equipments[targetSlot]];

	if (isTwoHandedWeapon(equipments[oppositeSlot])) {
		replacedCards.push(equipments[oppositeSlot]);
	}

	return uniqueCards(replacedCards);
};

const dispatchInventoryEquipEvent = (
	ownerId: TInventoryOwner,
	equippedCard: TCardWithParams,
	returnedCards: TCardWithParams[]
) => {
	window.dispatchEvent(
		new CustomEvent('inventory-card-equipped', {
			detail: {
				equippedCard,
				ownerId,
				returnedCards,
			},
		})
	);
};

const DndKitProvider = ({ children }: PropsWithChildren) => {
	const dispatch = useDispatch();
	const humanInventory = useSelector((state) => getInventoryByOwner(state, 'human'));
	const botInventory = useSelector((state) => getInventoryByOwner(state, 'bot'));
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
					const ownerId = dropData.ownerId;
					const inventory = ownerId === 'human' ? humanInventory : botInventory;
					const returnedCards = getReplacedInventoryCards(
						{ ...payload, ownerId },
						inventory
					);

					dispatch(addInventoryCard({ ...payload, ownerId: dropData.ownerId }));
					returnedCards.forEach((card) => dispatch(addPlayerHandCard(card)));
					dispatchInventoryEquipEvent(ownerId, cardData.card, returnedCards);
				} else {
					dispatch(addPlayerArenaCard(payload));
				}
			}

			resetDragState();
		},
		[botInventory, dispatch, humanInventory, resetDragState]
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
				zIndex={2147483646}
			>
				{activeCard ? <CardView {...activeCard} /> : null}
			</DragOverlay>
		</DndContext>
	);
};

export default DndKitProvider;
