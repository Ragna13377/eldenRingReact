import { RefObject } from 'react';
import { XYCoord } from 'react-dnd';
import { CardSubType } from '@shared/types/commonTypes';
import { baseTransition } from '@widgets/Сard/constants';

export type TCardDragHookProps = {
	cardRef: RefObject<HTMLDivElement>;
	subtype: CardSubType;
};
export type TSmoothShift = {
	transition: TTransition;
	position: XYCoord;
};
export type TTransition = 'none' | typeof baseTransition;
