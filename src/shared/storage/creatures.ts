import { TCreatureCard } from '@shared/types/cardTypes';
import {
	abilityEffect,
	CardSubType,
	CreatureRace,
	EquipmentType,
	PlayerClass,
	punishmentEffect,
} from '@shared/types/commonTypes';
import land_squirt from '@images/creatures/land_squirt.webp';
import miranda_sprout from '@images/creatures/miranda_sprout.webp';
import skeletal_slime from '@images/creatures/skeletal_slime.webp';
import rotten_stray from '@images/creatures/rotten_stray.webp';
import demi_human from '@images/creatures/demi_human.webp';
import skelet from '@images/creatures/skelet.webp';
import monstrous_crow from '@images/creatures/monstrous_crow.webp';
import guardian from '@images/creatures/guardian.webp';
import school_of_graven_mages from '@images/creatures/school_of_graven_mages.webp';
import warhawk from '@images/creatures/warhawk.webp';
import vulgar_milita from '@images/creatures/vulgar_milita.webp';
import ancestor_follower from '@images/creatures/ancestor_follower.webp';
import omenkiler from '@images/creatures/omenkiler.webp';
import kaiden_sellsword from '@images/creatures/kaiden_sellsword.webp';
import cleanrot_knight from '@images/creatures/cleanrot_knight.webp';
import royal_revenant from '@images/creatures/royal_revenant.webp';
import black_knife_assassin from '@images/creatures/black_knife_assassin.webp';
import fingercreeper from '@images/creatures/fingercreeper.webp';
import fallingstar_beast from '@images/creatures/fallingstar_beast.webp';
import wandering_mausoleum from '@images/creatures/wandering_mausoleum.webp';
import miranda from '@images/creatures/miranda.webp';
import crucible_knight from '@images/creatures/crucible_knight.webp';
import nights_cavalry from '@images/creatures/nights_cavalry.webp';
import troll_knight from '@images/creatures/troll_knight.webp';
import crystalian from '@images/creatures/crystalian.webp';
import deathbird from '@images/creatures/deathbird.webp';
import abductor_virgin from '@images/creatures/abductor_virgin.webp';
import bell_bearing_hunter from '@images/creatures/bell_bearing_hunter.webp';
import red_wolf from '@images/creatures/red_wolf.webp';
import golem from '@images/creatures/golem.webp';
import ulcerated_spirit from '@images/creatures/ulcerated_spirit.webp';
import flame_chariot from '@images/creatures/flame_chariot.webp';
import erdtree_avatar from '@images/creatures/erdtree_avatar.webp';
import grafted_scion from '@images/creatures/grafted_scion.webp';
import tree_sentinel from '@images/creatures/tree_sentinel.webp';
import adula from '@images/creatures/adula.webp';
import margit from '@images/creatures/margit.webp';
import godrick_the_grafted from '@images/creatures/godrick_the_grafted.webp';

export const creatures: TCreatureCard[] = [
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Земляной брызгун',
		image: land_squirt,
		strength: 1,
		level: 1,
		loot: 1,
		ability: [
			{
				type: abilityEffect.changeEscape,
				value: 1,
			},
		],
		punishment: [{ type: punishmentEffect.changeLevel, value: -1 }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Росток Миранды',
		image: miranda_sprout,
		strength: 1,
		level: 1,
		loot: 1,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.thief],
				value: 1,
			},
		],
		punishment: null,
		race: CreatureRace.plant,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Живая масса',
		image: skeletal_slime,
		strength: 1,
		level: 1,
		loot: 1,
		ability: [{ type: abilityEffect.changeEscape, value: -Infinity }],
		punishment: [
			{ type: punishmentEffect.removeClothes, value: EquipmentType.helmet },
		],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Гниющий бродячий пес',
		image: rotten_stray,
		strength: 1,
		level: 1,
		loot: 1,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.mage],
				value: 4,
			},
		],
		punishment: [
			{ type: punishmentEffect.removeClothes, value: EquipmentType.boots },
			{ type: punishmentEffect.changeLevel, value: -1 },
		],
		race: CreatureRace.beast,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Получеловек',
		image: demi_human,
		strength: 1,
		level: 1,
		loot: 1,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.priest],
				value: 3,
			},
		],
		punishment: [{ type: punishmentEffect.changeLevel, value: -1 }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Скелет',
		image: skelet,
		strength: 2,
		level: 1,
		loot: 1,
		ability: [{ type: abilityEffect.absolutePunishment, value: 2 }],
		punishment: [{ type: punishmentEffect.changeLevel, value: -2 }],
		race: CreatureRace.undead,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Чудовищная ворона',
		image: monstrous_crow,
		strength: 2,
		level: 1,
		loot: 1,
		ability: [{ type: abilityEffect.changeEscape, value: 2 }],
		punishment: [
			{ type: punishmentEffect.removeClothes, value: EquipmentType.weapon },
		],
		race: CreatureRace.beast,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Страж',
		image: guardian,
		strength: 2,
		level: 1,
		loot: 1,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.priest, PlayerClass.mage],
				value: -1,
			},
		],
		punishment: [{ type: punishmentEffect.changeLevel, value: -2 }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Многоликая сфера мудрецов',
		image: school_of_graven_mages,
		strength: 2,
		level: 1,
		loot: 1,
		ability: [{ type: abilityEffect.changeEscape, value: 1 }],
		punishment: [{ type: punishmentEffect.changeLevel, value: -1 }],
		race: CreatureRace.magical,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Штормовой ястреб',
		image: warhawk,
		strength: 2,
		level: 1,
		loot: 1,
		ability: [{ type: abilityEffect.changeEscape, value: -1 }],
		punishment: [{ type: punishmentEffect.changeLevel, value: -2 }],
		race: CreatureRace.beast,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Беспощадное ополчение',
		image: vulgar_milita,
		strength: 4,
		level: 1,
		loot: 2,
		ability: [{ type: abilityEffect.changeEscape, value: -2 }],
		punishment: [{ type: punishmentEffect.discard, value: 'D6' }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Почитатель предков',
		image: ancestor_follower,
		strength: 4,
		level: 1,
		loot: 2,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.priest, PlayerClass.mage],
				value: 5,
			},
		],
		punishment: [{ type: punishmentEffect.changeLevel, value: -2 }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Убийца огров',
		image: omenkiler,
		strength: 4,
		level: 1,
		loot: 2,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.thief],
				value: 5,
			},
		],
		punishment: [{ type: punishmentEffect.changeLevel, value: -2 }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Наемник из Кайдена',
		image: kaiden_sellsword,
		strength: 4,
		level: 1,
		loot: 2,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.warrior],
				value: 5,
			},
		],
		punishment: [{ type: punishmentEffect.discardEnemy, value: 2 }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Рыцарь чистой гнили',
		image: cleanrot_knight,
		strength: 6,
		level: 1,
		loot: 2,
		ability: null,
		punishment: [
			{ type: punishmentEffect.removeClothes, value: EquipmentType.amulet },
			{ type: punishmentEffect.changeLevel, value: -2 },
		],
		race: CreatureRace.undead,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Королевский призрак',
		image: royal_revenant,
		strength: 6,
		level: 1,
		loot: 2,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.warrior],
				value: 6,
			},
		],
		punishment: [{ type: punishmentEffect.removeClass }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Ассасин из Черных Ножей',
		image: black_knife_assassin,
		strength: 6,
		level: 1,
		loot: 2,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.thief],
				value: -Infinity,
			},
		],
		punishment: [{ type: punishmentEffect.discardEnemy, value: 2 }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Зачарованная рука',
		image: fingercreeper,
		strength: 6,
		level: 1,
		loot: 2,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.mage],
				value: 6,
			},
		],
		punishment: [{ type: punishmentEffect.discard, value: 'all' }],
		race: CreatureRace.magical,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Зверь падающей звезды',
		image: fallingstar_beast,
		strength: 8,
		level: 1,
		loot: 2,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.priest],
				value: 2,
			},
		],
		punishment: [
			{ type: punishmentEffect.changeLevel, value: -3 },
			{ type: punishmentEffect.removeClass },
		],
		race: CreatureRace.beast,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Блуждающий мавзолей',
		image: wandering_mausoleum,
		strength: 8,
		level: 1,
		loot: 2,
		ability: null,
		punishment: [{ type: punishmentEffect.changeLevel, value: -3 }],
		race: CreatureRace.magical,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Миранда',
		image: miranda,
		strength: 8,
		level: 1,
		loot: 2,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.thief],
				value: 6,
			},
		],
		punishment: [
			{ type: punishmentEffect.removeClothes, value: EquipmentType.helmet },
			{ type: punishmentEffect.changeLevel, value: -1 },
		],
		race: CreatureRace.plant,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Рыцарь Горнила',
		image: crucible_knight,
		strength: 8,
		level: 1,
		loot: 2,
		ability: [
			{
				type: abilityEffect.onlyCharacteristic,
				value: 'level',
			},
		],
		punishment: [
			{
				type: punishmentEffect.changeLevel,
				value: 'firstLevel',
			},
		],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Ночной всадник',
		image: nights_cavalry,
		strength: 10,
		level: 1,
		loot: 3,
		ability: [{ type: abilityEffect.changeEscape, value: -Infinity }],
		punishment: [{ type: punishmentEffect.changeLevel, value: -3 }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Тролль рыцарь',
		image: troll_knight,
		strength: 10,
		level: 1,
		loot: 3,
		ability: null,
		punishment: [{ type: punishmentEffect.discardEnemy, value: 2 }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Кристалиец',
		image: crystalian,
		strength: 10,
		level: 1,
		loot: 3,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.mage],
				value: 6,
			},
		],
		punishment: [{ type: punishmentEffect.changeLevel, value: 'D6' }],
		race: CreatureRace.magical,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Погребальная птица',
		image: deathbird,
		strength: 12,
		level: 1,
		loot: 3,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.priest],
				value: -Infinity,
			},
		],
		punishment: [{ type: punishmentEffect.changeLevel, value: -3 }],
		race: CreatureRace.undead,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Железная дева',
		image: abductor_virgin,
		strength: 12,
		level: 1,
		loot: 3,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.priest],
				value: 4,
			},
		],
		punishment: [
			{ type: punishmentEffect.removeClothes, value: EquipmentType.armor },
		],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Охотник за колокольными сферами',
		image: bell_bearing_hunter,
		strength: 12,
		level: 1,
		loot: 3,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.warrior, PlayerClass.thief],
				value: 3,
			},
		],
		punishment: [
			{
				type: punishmentEffect.changeLevel,
				value: -2,
				optional: { value: -3, targetClass: PlayerClass.thief },
			},
		],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Алый волк',
		image: red_wolf,
		strength: 14,
		level: 1,
		loot: 4,
		ability: [
			{
				type: abilityEffect.onlyCharacteristic,
				value: 'buff',
			},
		],
		punishment: [
			{
				type: punishmentEffect.changeLevel,
				value: 'death',
				optional: {
					value: 'D6',
					targetClass: PlayerClass.mage,
				},
			},
		],
		race: CreatureRace.beast,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Страж-голем',
		image: golem,
		strength: 14,
		level: 1,
		loot: 4,
		ability: [{ type: abilityEffect.changeEscape, value: Infinity }],
		punishment: [{ type: punishmentEffect.discard, value: 'all' }],
		race: CreatureRace.magical,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Изъязвленный древесный дух',
		image: ulcerated_spirit,
		strength: 14,
		level: 1,
		loot: 4,
		ability: [
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.warrior],
				value: 4,
			},
		],
		punishment: [
			{
				type: punishmentEffect.changeLevel,
				value: 'death',
			},
		],
		race: CreatureRace.plant,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Огненная колесница',
		image: flame_chariot,
		strength: 16,
		level: 2,
		loot: 4,
		ability: [{ type: abilityEffect.pursuit, value: 3 }],
		punishment: [
			{ type: punishmentEffect.removeClothes, value: EquipmentType.armor },
			{ type: punishmentEffect.discard, value: 'all' },
		],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Воплощение Древа Эрд',
		image: erdtree_avatar,
		strength: 16,
		level: 2,
		loot: 4,
		ability: [
			{ type: abilityEffect.pursuit, value: 3 },
			{ type: abilityEffect.absolutePunishment, value: 2 },
		],
		punishment: [{ type: punishmentEffect.discard, value: 2 }],
		race: CreatureRace.plant,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Сцион',
		image: grafted_scion,
		strength: 16,
		level: 2,
		loot: 4,
		ability: [
			{ type: abilityEffect.pursuit, value: 3 },
			{ type: abilityEffect.absolutePunishment, value: 2 },
		],
		punishment: [
			{
				type: punishmentEffect.changeLevel,
				value: 'firstLevel',
			},
		],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Страж древа',
		image: tree_sentinel,
		strength: 18,
		level: 2,
		loot: 4,
		ability: [{ type: abilityEffect.pursuit, value: 4 }],
		punishment: [{ type: punishmentEffect.changeLevel, value: 'death' }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Адула, дракон блестящих камней',
		image: adula,
		strength: 18,
		level: 2,
		loot: 4,
		ability: [
			{ type: abilityEffect.pursuit, value: 4 },
			{
				type: abilityEffect.changeStrength,
				targetClass: [PlayerClass.mage],
				value: 4,
			},
		],
		punishment: [{ type: punishmentEffect.changeLevel, value: 'death' }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Маргит, Ужасное Знамение',
		image: margit,
		strength: 20,
		level: 2,
		loot: 5,
		ability: [{ type: abilityEffect.pursuit, value: 5 }],
		punishment: [{ type: punishmentEffect.changeLevel, value: 'death' }],
		race: null,
	},
	{
		type: 'adventures',
		subtype: CardSubType.creature,
		title: 'Годрик, сторукий',
		image: godrick_the_grafted,
		strength: 21,
		level: 0,
		loot: 0,
		ability: [{ type: abilityEffect.changeEscape, value: -Infinity }],
		punishment: [{ type: punishmentEffect.changeLevel, value: 'death' }],
		race: null,
	},
];
