import type { TEquipmentCard } from '@shared/types/cardTypes';
import { CardSubType } from '@shared/types/commonTypes';
import type {
	CombatEvaluation,
	CombatState,
	GameCard,
	GameLogEntry,
	GameState,
	PlayerState,
} from './types';

export const getPlayer = (state: GameState, playerId: string) =>
	state.players.find((player) => player.id === playerId) as PlayerState;

export const updatePlayer = (
	state: GameState,
	playerId: string,
	update: (player: PlayerState) => PlayerState
): GameState => ({
	...state,
	players: state.players.map((player) =>
		player.id === playerId ? update(player) : player
	) as [PlayerState, PlayerState],
});

export const addLog = (
	state: GameState,
	playerId: string,
	text: string
): GameState => ({
	...state,
	log: [
		...state.log.slice(-7),
		{
			id: `log-${state.log.length + 1}-${Date.now()}`,
			playerId,
			text,
		} satisfies GameLogEntry,
	],
});

export const isEnemyCard = (card: GameCard | null) =>
	card?.card.subtype === CardSubType.creature;

export const getCardPower = (card: GameCard) => {
	if (card.card.subtype !== CardSubType.equipment) return 0;
	return (card.card as TEquipmentCard).primaryStats.strength;
};

export const getPlayerPower = (player: PlayerState) =>
	player.level +
	player.equippedItems.reduce((power, item) => power + getCardPower(item), 0);

export const evaluateCombat = (
	player: PlayerState,
	enemyCard: GameCard
): CombatEvaluation => {
	const enemy = enemyCard.card;
	const enemyPower = 'strength' in enemy ? enemy.strength : 0;
	const playerPower = getPlayerPower(player);
	const margin = playerPower - enemyPower;
	const expectedRewardCards = 'loot' in enemy ? enemy.loot : 0;
	const expectedLevelGain = 'level' in enemy ? enemy.level : 0;

	return {
		playerPower,
		enemyPower,
		margin,
		isWinning: margin > 0,
		requiredPowerToWin: enemyPower + 1 - playerPower,
		expectedRewardCards,
		expectedLevelGain,
		canReachWinningLevel: player.level + expectedLevelGain >= 10,
	};
};

export const createCombat = (
	player: PlayerState,
	enemyCard: GameCard
): CombatState => ({
	attackerPlayerId: player.id,
	enemyCard,
	...evaluateCombat(player, enemyCard),
});

export const drawEvent = (state: GameState): [GameState, GameCard | null] => {
	const [card, ...eventDeck] = state.eventDeck;
	return [{ ...state, eventDeck }, card ?? null];
};

export const drawReward = (state: GameState): [GameState, GameCard | null] => {
	const [card, ...rewardDeck] = state.rewardDeck;
	return [{ ...state, rewardDeck }, card ?? null];
};

export const discardEvent = (state: GameState, card: GameCard): GameState => ({
	...state,
	eventDiscard: [card, ...state.eventDiscard],
});

export const discardReward = (state: GameState, card: GameCard): GameState => ({
	...state,
	rewardDiscard: [card, ...state.rewardDiscard],
});

export const passTurn = (state: GameState): GameState => ({
	...state,
	currentPlayerId:
		state.currentPlayerId === state.humanPlayerId
			? state.botPlayerId
			: state.humanPlayerId,
	phase: 'turnPreparation',
	revealedEvent: null,
	combat: null,
	botDecision: null,
});

export const checkWinner = (state: GameState): GameState => {
	const winner = state.players.find((player) => player.level >= 10);
	if (!winner) return state;

	return {
		...state,
		phase: 'gameOver',
		winnerPlayerId: winner.id,
		players: state.players.map((player) => ({
			...player,
			hasWon: player.id === winner.id,
		})) as [PlayerState, PlayerState],
	};
};

export const createBotVisibleState = (state: GameState) => {
	const bot = getPlayer(state, state.botPlayerId);
	const human = getPlayer(state, state.humanPlayerId);

	return {
		self: {
			id: bot.id,
			name: bot.name,
			level: bot.level,
			classCards: bot.classCards,
			originCards: bot.originCards,
			hand: bot.hand,
			equippedItems: bot.equippedItems,
			carriedItems: bot.carriedItems,
			activeEffects: bot.activeEffects,
			isDead: bot.isDead,
			hasWon: bot.hasWon,
		},
		opponent: {
			id: human.id,
			name: human.name,
			level: human.level,
			handCount: human.hand.length,
			classCards: human.classCards,
			originCards: human.originCards,
			equippedItems: human.equippedItems,
			carriedItems: human.carriedItems,
			activeEffects: human.activeEffects,
			isDead: human.isDead,
			hasWon: human.hasWon,
		},
		phase: state.phase,
		eventDiscardTop: state.eventDiscard[0] ?? null,
		rewardDiscardTop: state.rewardDiscard[0] ?? null,
		eventDiscardKnownCards: state.eventDiscard,
		rewardDiscardKnownCards: state.rewardDiscard,
		combat: state.combat,
		log: state.log,
	};
};

