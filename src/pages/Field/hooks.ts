import { CardSubType } from '@shared/types/commonTypes';
import { useDroppable } from '@dnd-kit/core';

export const useDropField = () => {
	const { isOver, setNodeRef } = useDroppable({
		id: 'player-arena',
		data: {
			accept: CardSubType.creature,
			type: 'arena',
		},
	});

	return {
		isOver,
		setNodeRef,
	};
};
