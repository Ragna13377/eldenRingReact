import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { clearDraggableCard } from '@shared/services/DraggableCard/slice';
import { removePlayerHandCard } from '@shared/services/PlayerHand/slice';
import type {
	TCardPayload,
	TCardWithParams,
	TDropParams,
} from '@shared/types/utilityTypes';
import { type Dispatch, type RefObject, type SetStateAction, useEffect } from 'react';
import type { XYCoord } from 'react-dnd';
import { useDispatch } from '@/app/store';

export type TDropReplaceCard = {
	dropParams: TDropParams;
	setDropParams: Dispatch<SetStateAction<TDropParams>>;
	refObject: RefObject<HTMLDivElement | null>;
	currentDraggableCard: TCardWithParams | null;
	addCardAction: ActionCreatorWithPayload<TCardPayload>;
	getCardPayload?: (payload: TCardPayload) => TCardPayload;
};

export const useDropReplaceCard = (
	{
		dropParams,
		setDropParams,
		refObject,
		currentDraggableCard,
		addCardAction,
		getCardPayload,
	}: TDropReplaceCard,
	additionalFunction?: () => void
) => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (dropParams.isDrop && currentDraggableCard) {
			dispatch(removePlayerHandCard(currentDraggableCard));
			const dropTargetRect = refObject.current?.getBoundingClientRect() as DOMRect;
			const payload = {
				currentDraggableCard,
				dropTargetRect: dropTargetRect.toJSON(),
				cursorPosition: dropParams.getClientOffset as XYCoord,
			};
			dispatch(addCardAction(getCardPayload ? getCardPayload(payload) : payload));
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
		getCardPayload,
		additionalFunction,
	]);
};
