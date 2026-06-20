import type { TCardWithParams } from '@shared/types/utilityTypes';

export type TCardProps = TCardWithParams & {
	isActionable?: boolean;
	onCardClick?: (card: TCardWithParams) => void;
};

export type TCardDragHookProps = {
	card: TCardWithParams;
	cardKey: string;
};
