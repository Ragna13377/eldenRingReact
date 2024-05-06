import { DropTargetMonitor, XYCoord } from 'react-dnd';
import { Dispatch, RefObject, SetStateAction } from 'react';

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

export type TKey = string;
export type TCardWithParams = {
	card: TCard;
	cardKey: TKey;
};
export type TChangeModalParams = {
	isOpen: boolean;
	hoveredCardKey: TKey;
};
export type TDropParams = {
	isDrop: boolean;
	getClientOffset: XYCoord | null;
};
export type TCustomDrop = {
	accept: string;
	dropRef: RefObject<HTMLDivElement>;
	dropHandler: Dispatch<SetStateAction<TDropParams>>;
	hoverHandler?: (monitor: DropTargetMonitor<unknown, unknown>) => void;
};
export type TInventory<T> = {
	helmet: T;
	amulet: T;
	leftWeapon: T;
	rightWeapon: T;
	armor: T;
	boots: T;
};
export type TAddCardPayload = {
	currentDraggableCard: TCardWithParams | null;
	dropTargetRect: DOMRectReadOnly;
	cursorPosition: XYCoord;
};
