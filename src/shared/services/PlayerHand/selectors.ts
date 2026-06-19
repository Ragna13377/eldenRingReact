import { createSelector } from '@reduxjs/toolkit';
import type { TCardWithParams } from '@shared/types/utilityTypes';
import type { RootState } from '@/app/store';

export const getPlayerHandCardById = (id: string) =>
	createSelector(
		(state: RootState) => state.playerHand,
		(playerHand) =>
			playerHand.length > 0
				? (playerHand.find((el) => el.cardKey === id) as TCardWithParams)
				: null
	);
