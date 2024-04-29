import { XYCoord } from 'react-dnd';

export type cardType = 'adventures' | 'treasures';
export enum cardSubType {
	creature = 'Существо',
	equipment = 'Снаряжение',
	spell = 'Заклинание',
}
export enum creatureRace {
	plant = 'Растение',
	beast = 'Зверь',
	magical = 'Магическое существо',
	undead = 'Нежить',
}
export enum playerClass {
	mage = 'Маг',
	warrior = 'Воин',
	thief = 'Бандит',
	priest = 'Духовник',
}
export enum equipmentType {
	helmet = 'Шлем',
	armor = 'Доспех',
	boots = 'Обувь',
	amulet = 'Амулет',
	weapon = 'Оружие',
}
export type onlyCharacteristic = 'level' | 'buff';
export type changeLevelPunishment = 'firstLevel' | 'death' | 'D6';
export type discardPunishment = 'all' | 'D6';
export enum abilityEffect {
	changeEscape = 'changeEscape',
	changeStrength = 'changeStrength',
	absolutePunishment = 'absolutePunishment',
	onlyCharacteristic = 'onlyCharacteristic',
	pursuit = 'pursuit',
}
export type Ability =
	| {
			type:
				| abilityEffect.changeEscape
				| abilityEffect.absolutePunishment
				| abilityEffect.pursuit;
			value: number;
	  }
	| {
			type: abilityEffect.changeStrength;
			value: number;
			targetClass: playerClass[];
	  }
	| { type: abilityEffect.onlyCharacteristic; value: onlyCharacteristic };
export enum punishmentEffect {
	changeLevel = 'changeLevel',
	removeClothes = 'removeClothes',
	discard = 'discard',
	discardEnemy = 'discardEnemy',
	removeClass = 'removeClass',
}
export type Punishment =
	| {
			type: punishmentEffect.changeLevel;
			value: number | changeLevelPunishment;
			optional?: {
				value: number | changeLevelPunishment;
				targetClass: playerClass;
			};
	  }
	| { type: punishmentEffect.removeClothes; value: equipmentType }
	| { type: punishmentEffect.discard; value: number | discardPunishment }
	| { type: punishmentEffect.discardEnemy; value: number }
	| { type: punishmentEffect.removeClass };
export type equipmentStats = {
	strength: number;
	escape?: boolean;
	targetClass?: {
		classes: playerClass[];
		except?: boolean;
	};
}

export type TBaseCard = {
	type: cardType;
	subtype: cardSubType;
	title: string;
	image: string;
};
export type TAdditionalCardFields<T extends cardSubType> =
	T extends cardSubType.creature
		? {
				race: creatureRace | null;
				strength: number;
				level: number;
				loot: number;
				ability: Ability[] | null;
				punishment: Punishment[] | null;
			}
		: T extends cardSubType.equipment
			? {
					equipmentType: equipmentType;
					primaryStats: equipmentStats;
					bonus?: equipmentStats;
					exceptAll?: boolean;
				}
			: T extends cardSubType.spell
				? { weight: number }
				: never;

export type TCreatureCard = TBaseCard &
	TAdditionalCardFields<cardSubType.creature>;
export type TEquipmentCard = TBaseCard &
	TAdditionalCardFields<cardSubType.equipment>;
export type TSpellCard = TBaseCard & TAdditionalCardFields<cardSubType.spell>;
export type TWeaponCard = TEquipmentCard & {
	hands: number;
	weight: boolean;
};
export type TCard = TCreatureCard | TWeaponCard | TEquipmentCard | TSpellCard;

export type TKey = string;
export type TCardWithParams = {
	card: TCard;
	cardKey: TKey;
};
export type TChangeModalParams = {
	isOpen: boolean;
	hoverCardKey: TKey;
};
export type TDropParams = {
	isDrop: boolean;
	getClientOffset: XYCoord | null;
};
