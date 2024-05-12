export type CardType = 'adventures' | 'treasures';
export enum CardSubType {
	creature = 'Существо',
	equipment = 'Снаряжение',
	spell = 'Заклинание',
}
export enum CreatureRace {
	plant = 'Растение',
	beast = 'Зверь',
	magical = 'Магическое существо',
	undead = 'Нежить',
}
export enum PlayerClass {
	mage = 'Маг',
	warrior = 'Воин',
	thief = 'Бандит',
	priest = 'Духовник',
}
export enum EquipmentType {
	helmet = 'Шлем',
	armor = 'Доспех',
	boots = 'Обувь',
	amulet = 'Амулет',
	weapon = 'Оружие',
}
export type OnlyCharacteristic = 'level' | 'buff';
export type ChangeLevelPunishment = 'firstLevel' | 'death' | 'D6';
export type DiscardPunishment = 'all' | 'D6';

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
			targetClass: PlayerClass[];
	  }
	| { type: abilityEffect.onlyCharacteristic; value: OnlyCharacteristic };
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
			value: number | ChangeLevelPunishment;
			optional?: {
				value: number | ChangeLevelPunishment;
				targetClass: PlayerClass;
			};
	  }
	| { type: punishmentEffect.removeClothes; value: EquipmentType }
	| { type: punishmentEffect.discard; value: number | DiscardPunishment }
	| { type: punishmentEffect.discardEnemy; value: number }
	| { type: punishmentEffect.removeClass };
export type equipmentStats = {
	strength: number;
	escape?: boolean;
	targetClass?: {
		classes: PlayerClass[];
		except?: boolean;
	};
};
