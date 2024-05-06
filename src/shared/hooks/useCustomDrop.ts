import { useDrop } from 'react-dnd';
import { TCustomDrop } from '@shared/types';

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
