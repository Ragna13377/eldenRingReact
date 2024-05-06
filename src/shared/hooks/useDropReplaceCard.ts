import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import { removePlayerHandCard } from '@shared/services/PlayerHand/slice';
import { XYCoord } from 'react-dnd';
import { clearDraggableCard } from '@shared/services/DraggableCard/slice';
import { useDispatch } from '@/app/store';
import { TAddCardPayload, TCardWithParams, TDropParams } from '@shared/types';

export type TDropReplaceCard = {
	dropParams: TDropParams;
	setDropParams: Dispatch<SetStateAction<TDropParams>>;
	refObject: RefObject<HTMLDivElement>;
	currentDraggableCard: TCardWithParams | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addCardAction: (action: TAddCardPayload) => any;
};

export const useDropReplaceCard = (
	{
		dropParams,
		setDropParams,
		refObject,
		currentDraggableCard,
		addCardAction,
	}: TDropReplaceCard,
	additionalFunction?: () => void
) => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (dropParams.isDrop && currentDraggableCard) {
			dispatch(removePlayerHandCard(currentDraggableCard));
			const dropTargetRect =
				refObject.current?.getBoundingClientRect() as DOMRect;
			dispatch(
				addCardAction({
					currentDraggableCard,
					dropTargetRect: dropTargetRect.toJSON(),
					cursorPosition: dropParams.getClientOffset as XYCoord,
				})
			);
			dispatch(clearDraggableCard());
			setDropParams((prev) => ({
				...prev,
				isDrop: false,
				getClientOffset: null,
			}));
			if (additionalFunction) additionalFunction();
		}
	}, [
		dropParams,
		setDropParams,
		dispatch,
		refObject,
		currentDraggableCard,
		addCardAction,
		additionalFunction,
	]);
};
