import type { TChangeModalParams } from '@shared/types/utilityTypes';
import type { Dispatch, RefObject, SetStateAction } from 'react';

export type TFieldDropHookProps = {
	playerArenaRef: RefObject<HTMLDivElement | null>;
};

export type TFieldProps = {
	setIsModalOpen: Dispatch<SetStateAction<TChangeModalParams>>;
};
