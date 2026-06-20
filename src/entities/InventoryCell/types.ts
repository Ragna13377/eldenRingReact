import type {
	TCardWithParams,
	TChangeModalParams,
} from '@shared/types/utilityTypes';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

export type TInventoryCellProps = PropsWithChildren & {
	isAvailable?: boolean;
	extraClass?: string;
	data?: TCardWithParams | null;
	setIsModalOpen?: Dispatch<SetStateAction<TChangeModalParams>>;
};
