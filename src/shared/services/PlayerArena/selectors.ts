import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export const getPlayerArenaCardById = (id: string) => {
	createSelector(
		(state: RootState) => state.playerArena,
		(items) => (items ? items.find((el) => el.cardKey === id) : null)
	);
};
