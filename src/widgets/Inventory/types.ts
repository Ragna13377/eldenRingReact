import type { TCardWithParams, TInventoryEquipment } from '@shared/types/utilityTypes';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import type { DropTargetMonitor } from 'react-dnd';

export type TUseDropInventoryProps = {
	inventoryRef: RefObject<HTMLDivElement | null>;
};
export type TSetAvailableCellProps = TUseDropInventoryProps & {
	monitor: DropTargetMonitor<unknown, unknown>;
	currentDraggableCard: TCardWithParams | null;
	availableCell: TInventoryEquipment;
	setAvailableCell: Dispatch<SetStateAction<TInventoryEquipment>>;
};
