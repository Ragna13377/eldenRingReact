import { TWeaponCard } from '@shared/types/cardTypes';
import {
	CardSubType,
	EquipmentType,
	PlayerClass,
} from '@shared/types/commonTypes';
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
		subtype: CardSubType.equipment,
		title: 'Рожок посланца',
		image: envoys_horn,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 1,
			escape: true,
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Пика',
		image: pike,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 1,
		},
		hands: 2,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Гросс-мессер',
		image: grossmesser,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 2,
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Клеймор',
		image: claymore,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 2,
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Армейский меч',
		image: lordsworns_straight_sword,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 2,
			targetClass: { classes: [PlayerClass.thief], except: true },
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Колесо Гизы',
		image: ghizas_wheel,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 2,
		},
		hands: 2,
		weight: true,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Цвайнхендер',
		image: zweihander,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 3,
		},
		hands: 2,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Редувия',
		image: reduvia,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 3,
			targetClass: { classes: [PlayerClass.thief] },
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Гроза великанов',
		image: giant_crusher,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 3,
		},
		hands: 2,
		weight: true,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Звеньевой цеп',
		image: chainlink_flail,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 3,
			targetClass: { classes: [PlayerClass.thief] },
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Каменный меч короля драконов',
		image: dragon_kings_cragblade,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 3,
			targetClass: { classes: [PlayerClass.mage], except: true },
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Скипетр всеведущего',
		image: scepter_of_the_all_knowing,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 4,
			targetClass: { classes: [PlayerClass.priest] },
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Каменный щит с отпечатками',
		image: fingerprint_stone_shield,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 4,
			targetClass: { classes: [PlayerClass.warrior] },
		},
		hands: 1,
		weight: true,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Большой лук голема',
		image: golem_greatbow,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 4,
			targetClass: { classes: [PlayerClass.thief] },
		},
		hands: 2,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Большой молот',
		image: greathorn_hammer,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 4,
			targetClass: { classes: [PlayerClass.warrior] },
		},
		hands: 1,
		weight: false,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Золотая алебарда',
		image: golden_halberd,
		equipmentType: EquipmentType.weapon,
		exceptAll: true,
		primaryStats: {
			strength: 4,
		},
		hands: 2,
		weight: true,
	},
	{
		type: 'treasures',
		subtype: CardSubType.equipment,
		title: 'Метеоритный посох',
		image: meteorite_staff,
		equipmentType: EquipmentType.weapon,
		primaryStats: {
			strength: 5,
			targetClass: { classes: [PlayerClass.mage] },
		},
		hands: 1,
		weight: false,
	},
];
