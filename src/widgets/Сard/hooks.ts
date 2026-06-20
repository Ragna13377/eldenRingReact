import { useDraggable } from '@dnd-kit/core';
import type { TCardDragHookProps } from '@widgets/Сard/types';

export const useCardDrag = ({ card, cardKey }: TCardDragHookProps) =>
	useDraggable({
		id: cardKey,
		data: {
			card,
			subtype: card.card.subtype,
		},
	});
