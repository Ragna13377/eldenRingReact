import type {
	TClientPosition,
	TCardWithParams,
	TInventoryEquipment,
	TInventoryOwner,
	TChangeModalParams,
} from '@shared/types/utilityTypes';
import type { Dispatch, RefObject, SetStateAction } from 'react';

export type TInventoryProps = {
	ownerId: TInventoryOwner;
	isDropEnabled?: boolean;
	setIsModalOpen?: Dispatch<SetStateAction<TChangeModalParams>>;
};

export type TUseDropInventoryProps = {
	inventoryRef: RefObject<HTMLDivElement | null>;
	ownerId: TInventoryOwner;
	isDropEnabled?: boolean;
};
export type TSetAvailableCellProps = {
	clientOffset: TClientPosition | null;
	inventoryRef: RefObject<HTMLDivElement | null>;
	isOver: boolean;
	currentDraggableCard: TCardWithParams | null;
	availableCell: TInventoryEquipment;
	setAvailableCell: Dispatch<SetStateAction<TInventoryEquipment>>;
};
