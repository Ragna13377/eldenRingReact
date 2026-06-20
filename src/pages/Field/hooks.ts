import { CardSubType } from '@shared/types/commonTypes';
import { useDndContext, useDroppable } from '@dnd-kit/core';

export const useDropField = () => {
	const { active } = useDndContext();
	const activeSubtype = active?.data.current?.subtype;
	const acceptsActiveCard = activeSubtype === CardSubType.creature;
	const { isOver, setNodeRef } = useDroppable({
		id: 'player-arena',
		data: {
			accept: CardSubType.creature,
			type: 'arena',
		},
		disabled: Boolean(active) && !acceptsActiveCard,
	});

	return {
		isOver: isOver && acceptsActiveCard,
		setNodeRef,
	};
};
