import { RefObject } from 'react';
import { TKey } from '@shared/types';

export type TFieldDropHookProps = {
	playerArenaRef: RefObject<HTMLDivElement>;
	draggableCard: TKey;
};
