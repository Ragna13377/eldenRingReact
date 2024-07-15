import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import { XYCoord } from 'react-dnd';
import { useDispatch } from '@/app/store';
import { removePlayerHandCard } from '@shared/services/PlayerHand/slice';
import { clearDraggableCard } from '@shared/services/DraggableCard/slice';
import {
	TCardPayload,
	TCardWithParams,
	TDropParams,
} from '@shared/types/utilityTypes';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export type TDropReplaceCard = {
	dropParams: TDropParams;
	setDropParams: Dispatch<SetStateAction<TDropParams>>;
	refObject: RefObject<HTMLDivElement>;
	currentDraggableCard: TCardWithParams | null;
	addCardAction: ActionCreatorWithPayload<TCardPayload>;
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
