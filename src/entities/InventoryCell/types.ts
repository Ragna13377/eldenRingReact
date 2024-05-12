import { TCardWithParams } from '@shared/types/utilityTypes';

export type TInventoryCellProps = {
	isAvailable?: boolean;
	extraClass?: string;
	data?: TCardWithParams | null;
};
