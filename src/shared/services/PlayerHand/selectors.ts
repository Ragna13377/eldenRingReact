import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { TCardWithParams } from '@shared/types';

export const getPlayerHandCardById = (id: string) =>
	createSelector(
		(state: RootState) => state.playerHand,
		(playerHand) =>
			playerHand.length > 0 ? playerHand.find((el) => el.cardKey === id) as TCardWithParams : null
	);
