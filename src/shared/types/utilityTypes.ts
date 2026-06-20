import type { TCard } from '@shared/types/cardTypes';
import type { EquipmentType } from '@shared/types/commonTypes';

export type TChangeAction = 'add' | 'remove';
export type TKey = string;
export type TCardWithParams = {
	card: TCard;
	cardKey: TKey;
};
export type TChangeModalParams = {
	isOpen: boolean;
	hoveredCard: TCardWithParams | null;
};
export type TDropParams = {
	isDrop: boolean;
	getClientOffset: TClientPosition | null;
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
export type TClientPosition = {
	x: number;
	y: number;
};
export type TDropTargetRect = {
	left: number;
	right: number;
	width: number;
};
export type TCardPayload = {
	currentDraggableCard: TCardWithParams | null;
	dropTargetRect: TDropTargetRect;
	cursorPosition: TClientPosition;
	ownerId?: TInventoryOwner;
};
