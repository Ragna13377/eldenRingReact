import type { TCardWithParams } from '@shared/types/utilityTypes';
import type { PropsWithChildren } from 'react';

export type TInventoryCellProps = PropsWithChildren & {
	isAvailable?: boolean;
	extraClass?: string;
	data?: TCardWithParams | null;
};
