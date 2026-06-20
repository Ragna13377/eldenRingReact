import dragCursor from '@images/cursor/cursor_drag_50.png';
import pointerCursor from '@images/cursor/cursor_poiner_50.png';
import { useEffect, useState } from 'react';

type TCursorState = {
	x: number;
	y: number;
	isVisible: boolean;
	isDragging: boolean;
};

const pointerHotspot = {
	x: 14,
	y: 7,
};

const dragHotspot = {
	x: 23,
	y: 24,
};

const CustomCursor = () => {
	const [cursor, setCursor] = useState<TCursorState>({
		x: 0,
		y: 0,
		isVisible: false,
		isDragging: false,
	});

	useEffect(() => {
		const updateDraggingState = () => {
			setCursor((prev) => ({
				...prev,
				isDragging: document.documentElement.classList.contains('cardDragging'),
			}));
		};

		const handlePointerMove = (event: PointerEvent) => {
			setCursor((prev) => ({
				...prev,
				x: event.clientX,
				y: event.clientY,
				isVisible: true,
			}));
		};

		const handlePointerLeave = () => {
			setCursor((prev) => ({
				...prev,
				isVisible: false,
			}));
		};

		const observer = new MutationObserver(updateDraggingState);

		window.addEventListener('pointermove', handlePointerMove, { passive: true });
		document.documentElement.addEventListener('pointerleave', handlePointerLeave);
		window.addEventListener('blur', handlePointerLeave);
		observer.observe(document.documentElement, {
			attributeFilter: ['class'],
			attributes: true,
		});
		updateDraggingState();

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
			document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
			window.removeEventListener('blur', handlePointerLeave);
			observer.disconnect();
		};
	}, []);

	return (
		<img
			alt=""
			aria-hidden="true"
			className="customCursor"
			src={cursor.isDragging ? dragCursor : pointerCursor}
			style={{
				opacity: cursor.isVisible ? 1 : 0,
				transform: `translate3d(${
					cursor.x - (cursor.isDragging ? dragHotspot.x : pointerHotspot.x)
				}px, ${cursor.y - (cursor.isDragging ? dragHotspot.y : pointerHotspot.y)}px, 0)`,
			}}
		/>
	);
};

export default CustomCursor;
