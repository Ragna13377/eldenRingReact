import { creatures } from '@shared/storage/creatures';
import { equipments } from '@shared/storage/equipments';
import { spells } from '@shared/storage/spells';
import { weapons } from '@shared/storage/weapons';
import type { TCard } from '@shared/types/cardTypes';
import type { TCardWithParams } from '@shared/types/utilityTypes';
import { v4 as uuidv4 } from 'uuid';

export type TDeckState = {
	adventures: TCardWithParams[];
	treasures: TCardWithParams[];
};

export const deckSizes = {
	adventures: creatures.length + spells.length,
	treasures: weapons.length + equipments.length,
} satisfies Record<keyof TDeckState, number>;

const withCardKeys = (cards: TCard[]): TCardWithParams[] =>
	cards.map((card) => ({
		card,
		cardKey: uuidv4(),
	}));

const shuffle = <T>(items: T[]) => {
	const shuffledItems = [...items];

	for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		[shuffledItems[index], shuffledItems[randomIndex]] = [
			shuffledItems[randomIndex],
			shuffledItems[index],
		];
	}

	return shuffledItems;
};

export const createDecks = (): TDeckState => ({
	adventures: shuffle(withCardKeys([...creatures, ...spells])),
	treasures: shuffle(withCardKeys([...weapons, ...equipments])),
});

export const dealCards = (deck: TCardWithParams[], count: number) => ({
	drawnCards: deck.slice(0, count),
	remainingCards: deck.slice(count),
});
