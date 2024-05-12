import {
	TCard,
	TCreatureCard,
	TEquipmentCard,
	TSpellCard,
	TWeaponCard,
} from '@shared/types/cardTypes';
import { CardSubType, EquipmentType } from '@shared/types/commonTypes';

export const isCreatureCard = (card: TCard): card is TCreatureCard =>
	card.subtype === CardSubType.creature;

export const isEquipmentCard = (card: TCard): card is TEquipmentCard =>
	card.subtype === CardSubType.equipment;

export const isWeaponCard = (card: TCard): card is TWeaponCard => {
	if (!isEquipmentCard(card)) return false;
	return card.equipmentType === EquipmentType.weapon;
};

export const isSpellCard = (card: TCard): card is TSpellCard =>
	card.subtype === CardSubType.spell;
