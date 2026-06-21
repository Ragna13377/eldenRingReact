import type {
	TCardWithParams,
	TChangeModalParams,
	TInventoryEquipment,
	TInventoryOwner,
} from '@shared/types/utilityTypes';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

export type TInventoryCellProps = PropsWithChildren & {
	isAvailable?: boolean;
	extraClass?: string;
	data?: TCardWithParams | null;
	ownerId?: TInventoryOwner;
	slot?: keyof TInventoryEquipment;
	isPreviewSuppressed?: boolean;
	setIsModalOpen?: Dispatch<SetStateAction<TChangeModalParams>>;
};
