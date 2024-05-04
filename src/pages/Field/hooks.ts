import { useDrop, XYCoord } from 'react-dnd';
import { CardSubType, TDropParams } from '@shared/types';
import { TFieldDropHookProps } from '@pages/Field/types';
import { useDispatch, useSelector } from '@/app/store';
import { useEffect, useState } from 'react';
import { removePlayerHandCard } from '@shared/services/PlayerHand/slice';
import { addPlayerArenaCard } from '@shared/services/PlayerArena/slice';
import { clearDraggableCard, getDraggableCard } from '@shared/services/DraggableCard/slice';

export const useDropField = ({ playerArenaRef }: TFieldDropHookProps) => {
	const dispatch = useDispatch();
	const currentCardData = useSelector(getDraggableCard);
	const [dropParam, setDropParam] = useState<TDropParams>({
		isDrop: false,
		getClientOffset: null,
	});
	const [{ isOver }, drop] = useDrop({
		accept: CardSubType.creature,
		drop: (_, monitor) => {
			const getClientOffset = monitor.getClientOffset();
			setDropParam((prev) => ({
				...prev,
				isDrop: true,
				getClientOffset,
			}));
		},
		collect: (monitor) => ({ isOver: monitor.isOver() }),
	});
	drop(playerArenaRef);
	useEffect(() => {
		if (dropParam.isDrop && currentCardData) {
			const dropTargetRect =
				playerArenaRef.current?.getBoundingClientRect() as DOMRect;
			dispatch(removePlayerHandCard(currentCardData));
			dispatch(
				addPlayerArenaCard({
					currentCardData,
					dropTargetRect: dropTargetRect.toJSON(),
					cursorPosition: dropParam.getClientOffset as XYCoord,
				})
			);
			dispatch(clearDraggableCard());
			setDropParam((prev) => ({
				...prev,
				isDrop: false,
				getClientOffset: null,
			}));
		}
	}, [dropParam, dispatch, playerArenaRef, currentCardData]);
	return {
		isOver,
	};
};
