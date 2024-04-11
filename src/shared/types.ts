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
	talisman = 'Талисман',
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
			? { weight: number }
			: T extends cardSubType.spell
				? { weight: number }
				: never;

export type TCreatureCard = TBaseCard &
	TAdditionalCardFields<cardSubType.creature>;
export type TEquipmentCard = TBaseCard &
	TAdditionalCardFields<cardSubType.equipment>;
export type TSpellCard = TBaseCard & TAdditionalCardFields<cardSubType.spell>;
export type TCard = TCreatureCard | TEquipmentCard | TSpellCard;
