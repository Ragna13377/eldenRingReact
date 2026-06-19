import { CardSubType } from '@shared/types/commonTypes';
import type { GameCard, GameState, PlayerState } from '../types';
import { evaluateCombat, getCardPower } from '../utils';

export const evaluateCard = (
	card: GameCard,
	owner: PlayerState,
	_gameState: GameState
) => {
	if (card.card.subtype === CardSubType.equipment) {
		const canEquipNow = !owner.equippedItems.some(
			(item) => item.card.title === card.card.title
		);
		return getCardPower(card) * 10 + (canEquipNow ? 20 : 0);
	}

	if (card.card.subtype === CardSubType.creature) {
		const combat = evaluateCombat(owner, card);
		return (
			combat.expectedLevelGain * 50 +
			combat.expectedRewardCards * 20 -
			Math.max(0, combat.requiredPowerToWin) * 40
		);
	}

	return 5;
};

export const chooseWorstCards = (
	cards: GameCard[],
	owner: PlayerState,
	gameState: GameState,
	count: number
) =>
	[...cards]
		.sort(
			(left, right) =>
				evaluateCard(left, owner, gameState) - evaluateCard(right, owner, gameState)
		)
		.slice(0, count);

