import { TCardWithParams } from '@shared/types';

export type TInventoryCellProps = {
	isAvailable?: boolean;
	extraClass?: string;
	data?: TCardWithParams | null;
};
