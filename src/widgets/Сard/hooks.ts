import { baseTransition } from '@widgets/Сard/constants';
import type { TCardDragHookProps, TSmoothShift } from '@widgets/Сard/types';
import { useEffect, useState } from 'react';
import { useDrag, useDragLayer } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

export const useCardDrag = ({ cardRef, subtype, cardKey }: TCardDragHookProps) => {
	const [smoothShift, setSmoothShift] = useState<TSmoothShift>({
		transition: 'none',
		position: { x: 0, y: 0 },
	});
	const [{ isDrag }, drag, preview] = useDrag({
		type: subtype,
		item: { cardKey },
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
		}),
		end: (_, monitor) => {
			const differenceFromInitialOffset = monitor.getDifferenceFromInitialOffset();
			setSmoothShift((prev) => ({
				...prev,
				transition: 'none',
				position: {
					...prev.position,
					x: differenceFromInitialOffset?.x || 0,
					y: differenceFromInitialOffset?.y || 0,
				},
			}));
			if (monitor.didDrop()) return;

			setTimeout(() => {
				setSmoothShift((prev) => ({
					...prev,
					transition: baseTransition,
					position: {
						...prev.position,
						x: 0,
						y: 0,
					},
				}));
			}, 50);
		},
	});
	const dragClientOffset = useDragLayer((monitor) => {
		const item = monitor.getItem<{ cardKey: string }>();
		if (!item || item.cardKey !== cardKey) return null;
		return monitor.getClientOffset();
	});

	useEffect(() => {
		preview(getEmptyImage(), { captureDraggingState: true });
	}, [preview]);

	drag(cardRef);
	return {
		isDrag,
		dragClientOffset,
		smoothShift,
	};
};
