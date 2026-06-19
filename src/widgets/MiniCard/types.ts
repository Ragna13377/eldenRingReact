import type { TCardWithParams, TChangeModalParams } from '@shared/types/utilityTypes';
import type { Dispatch, SetStateAction } from 'react';

export type TMiniCardProps = TCardWithParams & {
	setIsModalOpen: Dispatch<SetStateAction<TChangeModalParams>>;
};
