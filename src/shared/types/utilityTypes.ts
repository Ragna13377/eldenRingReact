import type { TCard } from '@shared/types/cardTypes';
import type { EquipmentType } from '@shared/types/commonTypes';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import type { DropTargetMonitor, XYCoord } from 'react-dnd';

export type TChangeAction = 'add' | 'remove';
export type TKey = string;
export type TCardWithParams = {
	card: TCard;
	cardKey: TKey;
};
export type TChangeModalParams = {
	isOpen: boolean;
	hoveredCardKey: TKey;
};
export type TDropParams = {
	isDrop: boolean;
	getClientOffset: XYCoord | null;
};
export type TCustomDrop = {
	accept: string;
	dropRef: RefObject<HTMLDivElement | null>;
	dropHandler: Dispatch<SetStateAction<TDropParams>>;
	hoverHandler?: (monitor: DropTargetMonitor<unknown, unknown>) => void;
	canDrop?: boolean;
};
export type TInventoryEquipment<T = boolean> = Record<
	Exclude<keyof typeof EquipmentType, 'weapon'> | 'leftWeapon' | 'rightWeapon',
	T
>;
export type TInventory<T = null> = {
	score: number;
	effect: string;
	equipments: TInventoryEquipment<T>;
};
export type TInventoryOwner = 'human' | 'bot';
export type TCardPayload = {
	currentDraggableCard: TCardWithParams | null;
	dropTargetRect: DOMRectReadOnly;
	cursorPosition: XYCoord;
	ownerId?: TInventoryOwner;
};
