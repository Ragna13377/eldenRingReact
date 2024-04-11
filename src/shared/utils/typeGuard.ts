import {
	cardSubType,
	TCard,
	TCreatureCard,
	TEquipmentCard,
	TSpellCard,
} from '@shared/types';

export const isCreatureCard = (card: TCard): card is TCreatureCard =>
	card.subtype === cardSubType.creature;

export const isEquipmentCard = (card: TCard): card is TEquipmentCard =>
	card.subtype === cardSubType.equipment;

export const isSpellCard = (card: TCard): card is TSpellCard =>
	card.subtype === cardSubType.spell;
