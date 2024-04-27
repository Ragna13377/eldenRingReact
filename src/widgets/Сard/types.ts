import { cardSubType, TCardWithParams, TKey } from '@shared/types';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { baseTransition } from '@widgets/Сard/constants';
import { XYCoord } from 'react-dnd';

export type TCardProps = TCardWithParams & {
	dragHandler: Dispatch<SetStateAction<TKey>>;
};
export type TCardDragHookProps = {
	cardRef: RefObject<HTMLDivElement>;
	subtype: cardSubType;
};
export type TSmoothShift = {
	transition: TTransition;
	position: XYCoord;
};
export type TTransition = 'none' | typeof baseTransition;
