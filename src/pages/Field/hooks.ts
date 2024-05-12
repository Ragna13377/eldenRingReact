
import { TFieldDropHookProps } from '@pages/Field/types';
import { useSelector } from '@/app/store';
import { useState } from 'react';
import { CardSubType } from '@shared/types/commonTypes';
import { TDropParams } from '@shared/types/utilityTypes';
import { addPlayerArenaCard } from '@shared/services/PlayerArena/slice';
import { getDraggableCard } from '@shared/services/DraggableCard/slice';
import { useCustomDrop } from '@shared/hooks/useCustomDrop';
import { useDropReplaceCard } from '@shared/hooks/useDropReplaceCard';

export const useDropField = ({ playerArenaRef }: TFieldDropHookProps) => {
	const currentDraggableCard = useSelector(getDraggableCard);
	const [arenaDropResult, setArenaDropResult] = useState<TDropParams>({
		isDrop: false,
		getClientOffset: null,
	});
	const { isOver } = useCustomDrop({
		accept: CardSubType.creature,
		dropHandler: setArenaDropResult,
		dropRef: playerArenaRef,
	});
	useDropReplaceCard({
		dropParams: arenaDropResult,
		setDropParams: setArenaDropResult,
		refObject: playerArenaRef,
		currentDraggableCard,
		addCardAction: addPlayerArenaCard,
	});
	return {
		isOver,
	};
};
