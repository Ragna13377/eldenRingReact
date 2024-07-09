import { Dispatch, SetStateAction } from 'react';
import {
	TCardWithParams,
	TChangeModalParams,
} from '@shared/types/utilityTypes';

export type TMiniCardProps = TCardWithParams & {
	setIsModalOpen: Dispatch<SetStateAction<TChangeModalParams>>;
};
