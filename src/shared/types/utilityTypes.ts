import { DropTargetMonitor, XYCoord } from 'react-dnd';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { TCard } from '@shared/types/cardTypes';

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
	dropRef: RefObject<HTMLDivElement>;
	dropHandler: Dispatch<SetStateAction<TDropParams>>;
	hoverHandler?: (monitor: DropTargetMonitor<unknown, unknown>) => void;
};
export type TInventory<T = null> = {
	helmet: T;
	amulet: T;
	leftWeapon: T;
	rightWeapon: T;
	armor: T;
	boots: T;
};
export type TAddCardPayload = {
	currentDraggableCard: TCardWithParams | null;
	dropTargetRect: DOMRectReadOnly;
	cursorPosition: XYCoord;
};
