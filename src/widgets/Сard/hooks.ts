import { useDrag } from 'react-dnd';
import { useState } from 'react';
import { TCardDragHookProps, TSmoothShift } from '@widgets/Сard/types';
import { baseTransition } from '@widgets/Сard/constants';

export const useCardDrag = ({ cardRef, subtype }: TCardDragHookProps) => {
	const [smoothShift, setSmoothShift] = useState<TSmoothShift>({
		transition: 'none',
		position: { x: 0, y: 0 },
	});
	const [{ isDrag }, drag] = useDrag({
		type: subtype,
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
		}),
		end: (_, monitor) => {
			const differenceFromInitialOffset =
				monitor.getDifferenceFromInitialOffset();
			setSmoothShift((prev) => ({
				...prev,
				transition: 'none',
				position: {
					...prev.position,
					x: differenceFromInitialOffset?.x || 0,
					y: differenceFromInitialOffset?.y || 0,
				},
			}));
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
	drag(cardRef);
	return {
		isDrag,
		smoothShift,
	};
};
