import type {
	TCardWithParams,
	TInventoryEquipment,
	TInventoryOwner,
} from '@shared/types/utilityTypes';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import type { DropTargetMonitor } from 'react-dnd';

export type TInventoryProps = {
	ownerId: TInventoryOwner;
	isDropEnabled?: boolean;
};

export type TUseDropInventoryProps = {
	inventoryRef: RefObject<HTMLDivElement | null>;
	ownerId: TInventoryOwner;
	isDropEnabled?: boolean;
};
export type TSetAvailableCellProps = {
	inventoryRef: RefObject<HTMLDivElement | null>;
	monitor: DropTargetMonitor<unknown, unknown>;
	currentDraggableCard: TCardWithParams | null;
	availableCell: TInventoryEquipment;
	setAvailableCell: Dispatch<SetStateAction<TInventoryEquipment>>;
};
