import {
	Ability,
	CardSubType,
	CardType,
	CreatureRace,
	equipmentStats,
	EquipmentType,
	Punishment,
} from '@shared/types/commonTypes';

export type TBaseCard = {
	type: CardType;
	subtype: CardSubType;
	title: string;
	image: string;
};
export type TAdditionalCardFields<T extends CardSubType> =
	T extends CardSubType.creature
		? {
				race: CreatureRace | null;
				strength: number;
				level: number;
				loot: number;
				ability: Ability[] | null;
				punishment: Punishment[] | null;
			}
		: T extends CardSubType.equipment
			? {
					equipmentType: EquipmentType;
					primaryStats: equipmentStats;
					bonus?: equipmentStats;
					exceptAll?: boolean;
				}
			: T extends CardSubType.spell
				? { weight?: number }
				: never;

export type TCreatureCard = TBaseCard &
	TAdditionalCardFields<CardSubType.creature>;
export type TEquipmentCard = TBaseCard &
	TAdditionalCardFields<CardSubType.equipment>;
export type TSpellCard = TBaseCard & TAdditionalCardFields<CardSubType.spell>;
export type TWeaponCard = TEquipmentCard & {
	hands: number;
	weight: boolean;
};
export type TCard = TCreatureCard | TWeaponCard | TEquipmentCard | TSpellCard;
