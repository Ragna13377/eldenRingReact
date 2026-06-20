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

const withCardKeys = (cards: TCard[], keyPrefix?: string): TCardWithParams[] =>
	cards.map((card, index) => ({
		card,
		cardKey: keyPrefix ? `${keyPrefix}-${index + 1}` : uuidv4(),
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

const orderCardsByTitle = <T extends TCard>(cards: T[], titles: string[]) => {
	const selectedCards = titles
		.map((title) => cards.find((card) => card.title === title))
		.filter((card): card is T => Boolean(card));
	const selectedCardSet = new Set<TCard>(selectedCards);

	return [...selectedCards, ...cards.filter((card) => !selectedCardSet.has(card))];
};

const createTestDecks = (): TDeckState => ({
	adventures: withCardKeys(
		orderCardsByTitle([...creatures, ...spells], [
			'Росток Миранды',
			'Карающие шипы',
			'Туман Фии',
			'Скелет',
			'Получеловек',
			'Взрывное пламя смерти',
			'Чудовищная ворона',
			'Вой Шабрири',
			'Земляной брызгун',
			'Дрожь земли',
			'Маргит, Ужасное Знамение',
			'Рыцарь Горнила',
		]),
		'test-adventure'
	),
	treasures: withCardKeys(
		orderCardsByTitle([...weapons, ...equipments], [
			'Рожок посланца',
			'Кожаный доспех',
			'Головной убор пехотинца',
			'Краги победителя',
			'Осколок воина-кувшина',
			'Пика',
			'Чешуйчатый доспех',
			'Повязка с сияющими рогами',
			'Поножи с шипами',
			'Метеоритный посох',
			'Доспех Чёрного ножа',
			'Скрывающая вуаль',
		]),
		'test-treasure'
	),
});

export const isTestDeckEnabled = () => import.meta.env.VITE_USE_TEST_DECK === 'true';

export const createDecks = (): TDeckState => {
	if (isTestDeckEnabled()) {
		return createTestDecks();
	}

	return {
		adventures: shuffle(withCardKeys([...creatures, ...spells])),
		treasures: shuffle(withCardKeys([...weapons, ...equipments])),
	};
};

export const dealCards = (deck: TCardWithParams[], count: number) => ({
	drawnCards: deck.slice(0, count),
	remainingCards: deck.slice(count),
});
