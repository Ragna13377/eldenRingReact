import { CardSubType } from '@shared/types/commonTypes';
import type { GameState, PlayerState } from '../types';
import {
	addLog,
	checkWinner,
	createCombat,
	discardEvent,
	discardReward,
	drawEvent,
	drawReward,
	getPlayer,
	passTurn,
	updatePlayer,
} from '../utils';
import {
	chooseCardsToDiscardForHandLimit,
	choosePostEventMonster,
	choosePreparationCards,
} from './bot-policy';

const removeFromHand = (player: PlayerState, cardKeys: string[]) => ({
	...player,
	hand: player.hand.filter((card) => !cardKeys.includes(card.cardKey)),
});

export const runBotTurn = (state: GameState): GameState => {
	let nextState: GameState = {
		...state,
		phase: 'turnPreparation',
		botDecision: {
			difficulty: 'normal',
			reason: 'Бот выбирает легальные действия по базовым эвристикам.',
		},
	};
	let bot = getPlayer(nextState, nextState.botPlayerId);

	const equipmentToPlay = choosePreparationCards(bot);
	if (equipmentToPlay.length > 0) {
		const keys = equipmentToPlay.map((card) => card.cardKey);
		nextState = updatePlayer(nextState, bot.id, (player) => ({
			...removeFromHand(player, keys),
			equippedItems: [...player.equippedItems, ...equipmentToPlay],
		}));
		nextState = addLog(
			nextState,
			bot.id,
			`Бот экипировал: ${equipmentToPlay.map((card) => card.card.title).join(', ')}.`
		);
	}

	bot = getPlayer(nextState, nextState.botPlayerId);
	const [afterDraw, eventCard] = drawEvent({ ...nextState, phase: 'eventReveal' as const });
	nextState = afterDraw;
	if (!eventCard) {
		return passTurn(addLog(nextState, bot.id, 'Колода событий пуста.'));
	}

	nextState = {
		...nextState,
		revealedEvent: eventCard,
	};
	nextState = addLog(nextState, bot.id, `Бот открыл: ${eventCard.card.title}.`);

	if (eventCard.card.subtype === CardSubType.creature) {
		nextState = resolveBotCombat(nextState, eventCard);
	} else {
		nextState = discardEvent(nextState, eventCard);
		bot = getPlayer(nextState, nextState.botPlayerId);
		const monster = choosePostEventMonster(nextState, bot);
		if (monster) {
			nextState = updatePlayer(nextState, bot.id, (player) =>
				removeFromHand(player, [monster.cardKey])
			);
			nextState = addLog(nextState, bot.id, `Бот сыграл врага: ${monster.card.title}.`);
			nextState = resolveBotCombat(nextState, monster);
		} else {
			const [afterLoot, hiddenEvent] = drawEvent({
				...nextState,
				phase: 'postEventChoice' as const,
			});
			nextState = afterLoot;
			if (hiddenEvent) {
				nextState = updatePlayer(nextState, bot.id, (player) => ({
					...player,
					hand: [...player.hand, hiddenEvent],
				}));
				nextState = addLog(nextState, bot.id, 'Бот взял скрытую карту события.');
			}
		}
	}

	nextState = discardExtraCards(nextState);
	nextState = checkWinner(nextState);
	if (nextState.phase === 'gameOver') return nextState;

	return passTurn(addLog(nextState, bot.id, 'Бот завершил ход.'));
};

const resolveBotCombat = (
	state: GameState,
	enemyCard: NonNullable<GameState['revealedEvent']>
): GameState => {
	const bot = getPlayer(state, state.botPlayerId);
	const combat = createCombat(bot, enemyCard);
	let nextState: GameState = {
		...state,
		phase: 'combat',
		combat,
	};

	if (combat.isWinning) {
		nextState = updatePlayer(nextState, bot.id, (player) => ({
			...player,
			level: Math.min(10, player.level + combat.expectedLevelGain),
		}));
		nextState = addLog(
			nextState,
			bot.id,
			`Бот победил ${enemyCard.card.title}. Уровни: +${combat.expectedLevelGain}.`
		);
		nextState = discardEvent(nextState, enemyCard);

		for (let index = 0; index < combat.expectedRewardCards; index += 1) {
			const [afterReward, reward] = drawReward(nextState);
			nextState = afterReward;
			if (reward) {
				nextState = updatePlayer(nextState, bot.id, (player) => ({
					...player,
					hand: [...player.hand, reward],
				}));
			}
		}
	} else {
		nextState = discardEvent(nextState, enemyCard);
		nextState = addLog(nextState, bot.id, `Бот сбежал от ${enemyCard.card.title}.`);
	}

	return {
		...nextState,
		phase: 'handLimit' as const,
		combat: null,
		revealedEvent: null,
	};
};

const discardExtraCards = (state: GameState) => {
	const bot = getPlayer(state, state.botPlayerId);
	const discards = chooseCardsToDiscardForHandLimit(state, bot);
	if (discards.length === 0) return state;

	let nextState = updatePlayer(state, bot.id, (player) =>
		removeFromHand(
			player,
			discards.map((card) => card.cardKey)
		)
	);
	for (const card of discards) {
		nextState =
			card.card.type === 'treasures'
				? discardReward(nextState, card)
				: discardEvent(nextState, card);
	}

	return addLog(
		nextState,
		bot.id,
		`Бот сбросил: ${discards.map((card) => card.card.title).join(', ')}.`
	);
};
