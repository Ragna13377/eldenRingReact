import {
	cardSubType,
	equipmentType,
	playerClass,
	TEquipmentCard,
} from '@shared/types';
import leather_armor from '@images/equipment/leather_armor.webp';
import scale_armor from '@images/equipment/scale_armor.webp';
import fire_monk_armor from '@images/equipment/fire_monk_armor.webp';
import knight_armor from '@images/equipment/knight_armor.webp';
import briar_armor from '@images/equipment/briar_armor.webp';
import black_knife_armor from '@images/equipment/black_knife_armor.webp';
import foot_soldier_cap from '@images/equipment/foot_soldier_cap.webp';
import shining_horned_headband from '@images/equipment/shining_horned_headband.webp';
import lazuli_glintstone_crown from '@images/equipment/lazuli_glintstone_crown.webp';
import black_hood from '@images/equipment/black_hood.webp';
import champion_gaiters from '@images/equipment/champion_gaiters.webp';
import briar_greaves from '@images/equipment/briar_greaves.webp';
import shaman_leggings from '@images/equipment/shaman_leggings.webp';
import warrior_jar_shard from '@images/equipment/warrior_jar_shard.webp';
import starscourge_heirloom from '@images/equipment/starscourge_heirloom.webp';
import axe_talisman from '@images/equipment/axe_talisman.webp';
import old_lords_talisman from '@images/equipment/old_lords_talisman.webp';
import sacrificial_twig from '@images/equipment/sacrificial_twig.webp';
import concealing_veil from '@images/equipment/concealing_veil.webp';

export const equipments: TEquipmentCard[] = [
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Кожаный доспех',
		image: leather_armor,
		equipmentType: equipmentType.armor,
		primaryStats: {
			strength: 1,
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Чешуйчатый доспех',
		image: scale_armor,
		equipmentType: equipmentType.armor,
		primaryStats: {
			strength: 1,
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Доспех огненного монаха',
		image: fire_monk_armor,
		equipmentType: equipmentType.armor,
		primaryStats: {
			strength: 2,
			targetClass: { classes: [playerClass.priest] },
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Доспех рыцаря',
		image: knight_armor,
		equipmentType: equipmentType.armor,
		primaryStats: {
			strength: 3,
			targetClass: { classes: [playerClass.mage], except: true },
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Доспех с шипами',
		image: briar_armor,
		equipmentType: equipmentType.armor,
		primaryStats: {
			strength: 3,
			targetClass: { classes: [playerClass.warrior] },
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Доспех Чёрного ножа',
		image: black_knife_armor,
		equipmentType: equipmentType.armor,
		primaryStats: {
			strength: 4,
			targetClass: { classes: [playerClass.thief] },
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Головной убор пехотинца',
		image: foot_soldier_cap,
		equipmentType: equipmentType.helmet,
		primaryStats: {
			strength: 1,
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Повязка с сияющими рогами',
		image: shining_horned_headband,
		equipmentType: equipmentType.helmet,
		primaryStats: {
			strength: 2,
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Лазурная блестящая корона',
		image: lazuli_glintstone_crown,
		equipmentType: equipmentType.helmet,
		primaryStats: {
			strength: 3,
			targetClass: { classes: [playerClass.mage] },
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Чёрный капюшон',
		image: black_hood,
		equipmentType: equipmentType.helmet,
		primaryStats: {
			strength: 3,
		},
		exceptAll: true,
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Краги победителя',
		image: champion_gaiters,
		equipmentType: equipmentType.boots,
		primaryStats: {
			strength: 2,
			escape: true,
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Поножи с шипами',
		image: briar_greaves,
		equipmentType: equipmentType.boots,
		primaryStats: {
			strength: 2,
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Поножи шамана',
		image: shaman_leggings,
		equipmentType: equipmentType.boots,
		primaryStats: {
			strength: 1,
		},
		bonus: {
			strength: 2,
			targetClass: { classes: [playerClass.mage] },
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Осколок воина-кувшина',
		image: warrior_jar_shard,
		equipmentType: equipmentType.amulet,
		primaryStats: {
			strength: 1,
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Наследие Бича Звёзд',
		image: starscourge_heirloom,
		equipmentType: equipmentType.amulet,
		primaryStats: {
			strength: 3,
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Талисман топора',
		image: axe_talisman,
		equipmentType: equipmentType.amulet,
		primaryStats: {
			strength: 3,
			targetClass: { classes: [playerClass.mage], except: true },
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Талисман старого лорда',
		image: old_lords_talisman,
		equipmentType: equipmentType.amulet,
		primaryStats: {
			strength: 3,
			targetClass: { classes: [playerClass.mage] },
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Жертвенная ветвь',
		image: sacrificial_twig,
		equipmentType: equipmentType.amulet,
		primaryStats: {
			strength: 6,
			escape: true,
		},
	},
	{
		type: 'treasures',
		subtype: cardSubType.equipment,
		title: 'Скрывающая вуаль',
		image: concealing_veil,
		equipmentType: equipmentType.amulet,
		primaryStats: {
			strength: 1,
			escape: true,
		},
	},
];
