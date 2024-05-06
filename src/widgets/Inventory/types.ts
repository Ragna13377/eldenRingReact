import { DropTargetMonitor } from 'react-dnd';
import { TCardWithParams, TInventory } from '@shared/types';
import { Dispatch, RefObject, SetStateAction } from 'react';

export type TUseDropInventoryProps = {
	inventoryRef: RefObject<HTMLDivElement>;
};
export type TSetAvailableCellProps = TUseDropInventoryProps & {
	monitor: DropTargetMonitor<unknown, unknown>;
	currentDraggableCard: TCardWithParams | null;
	availableCell: TInventory<boolean>;
	setAvailableCell: Dispatch<SetStateAction<TInventory<boolean>>>;
};
