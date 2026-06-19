import { CardSubType } from '@shared/types/commonTypes';
import type { GameCard, GameState, PlayerState } from '../types';
import { evaluateCombat, getCardPower } from '../utils';
import { chooseWorstCards, evaluateCard } from './bot-evaluation';

export const choosePreparationCards = (botPlayer: PlayerState) =>
	botPlayer.hand
		.filter((card) => card.card.subtype === CardSubType.equipment)
		.sort((left, right) => getCardPower(right) - getCardPower(left))
		.slice(0, 3);

export const choosePostEventMonster = (
	gameState: GameState,
	botPlayer: PlayerState
): GameCard | null => {
	const monsters = botPlayer.hand.filter(
		(card) => card.card.subtype === CardSubType.creature
	);
	const winnable = monsters
		.map((card) => ({
			card,
			combat: evaluateCombat(botPlayer, card),
			value: evaluateCard(card, botPlayer, gameState),
		}))
		.filter(({ combat }) => combat.isWinning)
		.sort((left, right) => right.value - left.value);

	return winnable[0]?.card ?? null;
};

export const chooseCardsToDiscardForHandLimit = (
	gameState: GameState,
	botPlayer: PlayerState
) => {
	const overflow = Math.max(0, botPlayer.hand.length - 5);
	if (overflow === 0) return [];
	return chooseWorstCards(botPlayer.hand, botPlayer, gameState, overflow);
};

