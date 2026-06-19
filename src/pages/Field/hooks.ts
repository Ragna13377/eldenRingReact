import type { TFieldDropHookProps } from '@pages/Field/types';
import { useCustomDrop } from '@shared/hooks/useCustomDrop';
import { useDropReplaceCard } from '@shared/hooks/useDropReplaceCard';
import { getDraggableCard } from '@shared/services/DraggableCard/slice';
import { addPlayerArenaCard } from '@shared/services/PlayerArena/slice';
import { CardSubType } from '@shared/types/commonTypes';
import type { TDropParams } from '@shared/types/utilityTypes';
import { useState } from 'react';
import { useSelector } from '@/app/store';

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
