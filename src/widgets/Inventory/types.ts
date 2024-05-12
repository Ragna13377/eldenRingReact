import { DropTargetMonitor } from 'react-dnd';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { TCardWithParams, TInventory } from '@shared/types/utilityTypes';

export type TUseDropInventoryProps = {
	inventoryRef: RefObject<HTMLDivElement>;
};
export type TSetAvailableCellProps = TUseDropInventoryProps & {
	monitor: DropTargetMonitor<unknown, unknown>;
	currentDraggableCard: TCardWithParams | null;
	availableCell: TInventory<boolean>;
	setAvailableCell: Dispatch<SetStateAction<TInventory<boolean>>>;
};
