import { createSelector } from '@reduxjs/toolkit';
import type { TCardWithParams } from '@shared/types/utilityTypes';
import type { RootState } from '@/app/store';

export const getPlayerArenaCardById = (id: string) =>
	createSelector(
		(state: RootState) => state.playerArena,
		(items) => (items ? (items.find((el) => el.cardKey === id) as TCardWithParams) : null)
	);
