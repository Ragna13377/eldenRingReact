import {
	cardSubType,
	equipmentType,
	TCard,
	TCreatureCard,
	TEquipmentCard,
	TSpellCard,
	TWeaponCard,
} from '@shared/types';

export const isCreatureCard = (card: TCard): card is TCreatureCard =>
	card.subtype === cardSubType.creature;

export const isEquipmentCard = (card: TCard): card is TEquipmentCard =>
	card.subtype === cardSubType.equipment;

export const isWeaponCard = (card: TCard): card is TWeaponCard => {
	if (!isEquipmentCard(card)) return false;
	return card.equipmentType === equipmentType.weapon;
};

export const isSpellCard = (card: TCard): card is TSpellCard =>
	card.subtype === cardSubType.spell;
