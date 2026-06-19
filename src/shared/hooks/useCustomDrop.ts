import type { TCustomDrop } from '@shared/types/utilityTypes';
import { useDrop } from 'react-dnd';

export const useCustomDrop = ({
	accept,
	dropRef,
	dropHandler,
	hoverHandler,
}: TCustomDrop) => {
	const [{ isOver }, drop] = useDrop({
		accept,
		drop: (_, monitor) => {
			const getClientOffset = monitor.getClientOffset();
			dropHandler((prev) => ({
				...prev,
				isDrop: true,
				getClientOffset,
			}));
		},
		hover: (_, monitor) => {
			if (hoverHandler) hoverHandler(monitor);
		},
		collect: (monitor) => ({ isOver: monitor.isOver() }),
	});
	drop(dropRef);
	return { isOver };
};
