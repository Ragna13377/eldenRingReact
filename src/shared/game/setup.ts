import { createDecks, dealCards } from '@shared/storage/decks';
import type { GameState, PlayerKind, PlayerState } from './types';

const createPlayer = (kind: PlayerKind, name: string): PlayerState => ({
	id: kind === 'human' ? 'humanPlayer' : 'botPlayer',
	kind,
	name,
	level: 1,
	classCards: [],
	originCards: [],
	hand: [],
	equippedItems: [],
	carriedItems: [],
	activeEffects: [],
	isDead: false,
	hasWon: false,
});

export const createInitialDuelGame = (): GameState => {
	const decks = createDecks();
	const humanEvents = dealCards(decks.adventures, 4);
	const botEvents = dealCards(humanEvents.remainingCards, 4);
	const humanRewards = dealCards(decks.treasures, 4);
	const botRewards = dealCards(humanRewards.remainingCards, 4);
	const humanPlayer = createPlayer('human', 'Погасший');
	const botPlayer = createPlayer('bot', 'Соперник');

	humanPlayer.hand = [...humanEvents.drawnCards, ...humanRewards.drawnCards];
	botPlayer.hand = [...botEvents.drawnCards, ...botRewards.drawnCards];

	return {
		id: 'duel-game',
		players: [humanPlayer, botPlayer],
		humanPlayerId: humanPlayer.id,
		botPlayerId: botPlayer.id,
		currentPlayerId: humanPlayer.id,
		phase: 'turnPreparation',
		eventDeck: botEvents.remainingCards,
		rewardDeck: botRewards.remainingCards,
		eventDiscard: [],
		rewardDiscard: [],
		revealedEvent: null,
		combat: null,
		botDecision: null,
		log: [
			{
				id: 'log-start',
				playerId: humanPlayer.id,
				text: 'Дуэль началась: человек против бота.',
			},
		],
		winnerPlayerId: null,
	};
};

