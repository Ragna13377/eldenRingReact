import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { TCardWithParams } from '@shared/types/utilityTypes';

export const getPlayerArenaCardById = (id: string) =>
	createSelector(
		(state: RootState) => state.playerArena,
		(items) =>
			items ? (items.find((el) => el.cardKey === id) as TCardWithParams) : null
	);
