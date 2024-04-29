import {
	cardSubType,
	equipmentType,
	playerClass,
	TWeaponCard,
} from '@shared/types';
import envoys_horn from '@images/weapon/envoys_horn.webp';
import pike from '@images/weapon/pike.webp';
import grossmesser from '@images/weapon/grossmesser.webp';
import claymore from '@images/weapon/claymore.webp';
import lordsworns_straight_sword from '@images/weapon/lordsworns_straight_sword.webp';
import ghizas_wheel from '@images/weapon/ghizas_wheel.webp';
import zweihander from '@images/weapon/zweihander.webp';
import reduvia from '@images/weapon/reduvia.webp';
import giant_crusher from '@images/weapon/giant_crusher.webp';
import chainlink_flail from '@images/weapon/chainlink_flail.webp';
import dragon_kings_cragblade from '@images/weapon/dragon_kings_cragblade.webp';
import scepter_of_the_all_knowing from '@images/weapon/scepter_of_the_all_knowing.webp';
import fingerprint_stone_shield from '@images/weapon/fingerprint_stone_shield.webp';
import golem_greatbow from '@images/weapon/golem_greatbow.webp';
import greathorn_hammer from '@images/weapon/greathorn_hammer.webp';
import golden_halberd from '@images/weapon/golden_halberd.webp';
import meteorite_staff from '@images/weapon/meteorite_staff.webp';
export const weapons: TWeaponCard[] = [
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Рожок посланца',
		image: envoys_horn,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 1,
			escape: true,
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Пика',
		image: pike,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 1,
		},
		hands: 2,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Гросс-мессер',
		image: grossmesser,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 2,
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Клеймор',
		image: claymore,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 2,
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Армейский меч',
		image: lordsworns_straight_sword,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 2,
			targetClass: { classes: [playerClass.thief], except: true },
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Колесо Гизы',
		image: ghizas_wheel,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 2,
		},
		hands: 2,
		weight: true,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Цвайнхендер',
		image: zweihander,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 3,
		},
		hands: 2,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Редувия',
		image: reduvia,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 3,
			targetClass: { classes: [playerClass.thief] },
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Гроза великанов',
		image: giant_crusher,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 3,
		},
		hands: 2,
		weight: true,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Звеньевой цеп',
		image: chainlink_flail,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 3,
			targetClass: { classes: [playerClass.thief] },
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Каменный меч короля драконов',
		image: dragon_kings_cragblade,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 3,
			targetClass: { classes: [playerClass.mage], except: true },
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Скипетр всеведущего',
		image: scepter_of_the_all_knowing,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 4,
			targetClass: { classes: [playerClass.priest] },
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Каменный щит с отпечатками',
		image: fingerprint_stone_shield,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 4,
			targetClass: { classes: [playerClass.warrior] },
		},
		hands: 1,
		weight: true,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Большой лук голема',
		image: golem_greatbow,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 4,
			targetClass: { classes: [playerClass.thief] },
		},
		hands: 2,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Большой молот',
		image: greathorn_hammer,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 4,
			targetClass: { classes: [playerClass.warrior] },
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Золотая алебарда',
		image: golden_halberd,
		equipmentType: equipmentType.weapon,
		exceptAll: true,
		primaryStats: {
			strength: 4,
		},
		hands: 2,
		weight: true,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Метеоритный посох',
		image: meteorite_staff,
		equipmentType: equipmentType.weapon,
		primaryStats: {
			strength: 5,
			targetClass: { classes: [playerClass.mage] },
		},
		hands: 1,
		weight: false,
	},
];
