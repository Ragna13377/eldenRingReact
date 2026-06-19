import type { CardSubType } from '@shared/types/commonTypes';
import type { TCardWithParams } from '@shared/types/utilityTypes';
import type { baseTransition } from '@widgets/Сard/constants';
import type { RefObject } from 'react';
import type { XYCoord } from 'react-dnd';

export type TCardProps = TCardWithParams & {
	isActionable?: boolean;
	onCardClick?: (card: TCardWithParams) => void;
};

export type TCardDragHookProps = {
	cardRef: RefObject<HTMLElement | null>;
	subtype: CardSubType;
};
export type TSmoothShift = {
	transition: TTransition;
	position: XYCoord;
};
export type TTransition = 'none' | typeof baseTransition;
