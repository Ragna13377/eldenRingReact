import { Dispatch, SetStateAction } from 'react';
import { TCardWithParams, TChangeModalParams } from '@shared/types';

export type TMiniCardProps = TCardWithParams & {
	setIsModalOpen: Dispatch<SetStateAction<TChangeModalParams>>;
};
