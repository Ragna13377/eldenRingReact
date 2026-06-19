import type { TCardWithParams } from '@shared/types/utilityTypes';

export type GameCard = TCardWithParams;
export type PlayerKind = 'human' | 'bot';

export type PlayerState = {
	id: string;
	kind: PlayerKind;
	name: string;
	level: number;
	classCards: GameCard[];
	originCards: GameCard[];
	hand: GameCard[];
	equippedItems: GameCard[];
	carriedItems: GameCard[];
	activeEffects: GameCard[];
	isDead: boolean;
	hasWon: boolean;
};

export type GamePhase =
	| 'setup'
	| 'turnPreparation'
	| 'eventReveal'
	| 'postEventChoice'
	| 'combat'
	| 'combatIntervention'
	| 'reward'
	| 'escape'
	| 'handLimit'
	| 'gameOver';

export type CombatState = {
	attackerPlayerId: string;
	enemyCard: GameCard;
	playerPower: number;
	enemyPower: number;
	margin: number;
	isWinning: boolean;
	requiredPowerToWin: number;
	expectedRewardCards: number;
	expectedLevelGain: number;
	canReachWinningLevel: boolean;
};

export type BotDifficulty = 'easy' | 'normal' | 'hard';

export type BotDecisionState = {
	difficulty: BotDifficulty;
	reason: string;
};

export type GameLogEntry = {
	id: string;
	playerId: string;
	text: string;
};

export type GameState = {
	id: string;
	players: [PlayerState, PlayerState];
	humanPlayerId: string;
	botPlayerId: string;
	currentPlayerId: string;
	phase: GamePhase;
	eventDeck: GameCard[];
	rewardDeck: GameCard[];
	eventDiscard: GameCard[];
	rewardDiscard: GameCard[];
	revealedEvent: GameCard | null;
	combat: CombatState | null;
	botDecision: BotDecisionState | null;
	log: GameLogEntry[];
	winnerPlayerId: string | null;
};

export type CombatEvaluation = Pick<
	CombatState,
	| 'playerPower'
	| 'enemyPower'
	| 'margin'
	| 'isWinning'
	| 'requiredPowerToWin'
	| 'expectedRewardCards'
	| 'expectedLevelGain'
	| 'canReachWinningLevel'
>;

export type BotVisiblePlayerState = Omit<PlayerState, 'kind'>;

export type BotVisibleOpponentState = {
	id: string;
	name: string;
	level: number;
	handCount: number;
	classCards: GameCard[];
	originCards: GameCard[];
	equippedItems: GameCard[];
	carriedItems: GameCard[];
	activeEffects: GameCard[];
	isDead: boolean;
	hasWon: boolean;
};

export type BotVisibleState = {
	self: BotVisiblePlayerState;
	opponent: BotVisibleOpponentState;
	phase: GamePhase;
	eventDiscardTop: GameCard | null;
	rewardDiscardTop: GameCard | null;
	eventDiscardKnownCards: GameCard[];
	rewardDiscardKnownCards: GameCard[];
	combat: CombatState | null;
	log: GameLogEntry[];
};

