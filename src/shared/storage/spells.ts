import { TSpellCard } from '@shared/types/cardTypes';
import { CardSubType } from '@shared/types/commonTypes';
import briars_of_punishment from '@images/spells/briars_of_punishment.webp';
import explosive_ghostflame from '@images/spells/explosive_ghostflame.webp';
import fias_mist from '@images/spells/fias_mist.webp';
import howl_of_shabriri from '@images/spells/howl_of_shabriri.webp';
import shatter_earth from '@images/spells/shatter_earth.webp';
import crystal_torrent from '@images/spells/crystal_torrent.webp';
import aspects_of_the_crucible_tail from '@images/spells/aspects_of_the_crucible_tail.webp';
import poison_mist from '@images/spells/poison_mist.webp';
import rannis_dark_moon from '@images/spells/rannis_dark_moon.webp';
import aspects_of_the_crucible_breath from '@images/spells/aspects_of_the_crucible_breath.webp';
import honed_bolt from '@images/spells/honed_bolt.webp';
import aspects_of_the_crucible_horns from '@images/spells/aspects_of_the_crucible_horns.webp';
import carian_piercer from '@images/spells/carian_piercer.webp';
import ambush_shard from '@images/spells/ambush_shard.webp';

export const spells: TSpellCard[] = [
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Карающие шипы',
		image: briars_of_punishment,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Взрывное пламя смерти',
		image: explosive_ghostflame,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Взрывное пламя смерти',
		image: explosive_ghostflame,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Туман Фии',
		image: fias_mist,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Вой Шабрири',
		image: howl_of_shabriri,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Дрожь земли',
		image: shatter_earth,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Кристальный ураган',
		image: crystal_torrent,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Рыцарь Горнила: хвост',
		image: aspects_of_the_crucible_tail,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Ядовитый туман',
		image: poison_mist,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Темная луна Ренни',
		image: rannis_dark_moon,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Рыцарь Горнила: дыхание',
		image: aspects_of_the_crucible_breath,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Прицельный удар',
		image: honed_bolt,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Рыцарь Горнила: рога',
		image: aspects_of_the_crucible_horns,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Карианское жало',
		image: carian_piercer,
	},
	{
		type: 'adventures',
		subtype: CardSubType.spell,
		title: 'Осколок засады',
		image: ambush_shard,
	},
]