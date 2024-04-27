import { useDrop, XYCoord } from 'react-dnd';
import { cardSubType, TDropParams } from '@shared/types';
import { TFieldDropHookProps } from '@pages/Field/types';
import { useDispatch, useSelector } from '@/app/store';
import { useEffect, useState } from 'react';
import { removePlayerHandCard } from '@shared/services/PlayerHand/slice';
import { addPlayerArenaCard } from '@shared/services/PlayerArena/slice';
import { getPlayerHandCardById } from '@shared/services/PlayerHand/selectors';

export const useDropField = ({
	playerArenaRef,
	draggableCard,
}: TFieldDropHookProps) => {
	const dispatch = useDispatch();
	const currentCardData = useSelector(getPlayerHandCardById(draggableCard));
	const [dropParam, setDropParam] = useState<TDropParams>({
		isDrop: false,
		getClientOffset: null,
	});
	const [{ isOver }, drop] = useDrop({
		accept: cardSubType.creature,
		drop: (_, monitor) =>
			setDropParam({
				isDrop: true,
				getClientOffset: monitor.getClientOffset(),
			}),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});
	drop(playerArenaRef);
	useEffect(() => {
		if (dropParam.isDrop && currentCardData) {
			console.log(dropParam.isDrop, currentCardData);
			const dropTargetRect =
				playerArenaRef.current?.getBoundingClientRect() as DOMRect;
			dispatch(removePlayerHandCard(draggableCard));
			dispatch(
				addPlayerArenaCard({
					currentCardData,
					dropTargetRect: dropTargetRect.toJSON(),
					cursorPosition: dropParam.getClientOffset as XYCoord,
				})
			);
			setDropParam({ isDrop: false, getClientOffset: null });
		}
	}, [dropParam, dispatch, draggableCard, playerArenaRef, currentCardData]);
	return {
		isOver,
	};
};
