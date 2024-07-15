import { PropsWithChildren } from 'react';
import { TCardWithParams } from '@shared/types/utilityTypes';

export type TInventoryCellProps = PropsWithChildren & {
	isAvailable?: boolean;
	extraClass?: string;
	data?: TCardWithParams | null;
};
