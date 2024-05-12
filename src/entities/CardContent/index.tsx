import { clsx } from 'clsx';
import React from 'react';
import { CreatureRace } from '@shared/types/commonTypes';
import { TCardContentProps } from '@entities/CardContent/types';
import { isCreatureCard, isEquipmentCard } from '@shared/utils/typeGuard';
import { getEnumKeyByValue } from '@shared/utils/utils';
import Features from '@entities/Features';
import styles from './style.module.scss';
const CardContent = ({
	card,
	extraContentStyle,
	children,
}: TCardContentProps) => (
	<div className={clsx(styles.content, extraContentStyle)}>
		{isCreatureCard(card) && (
			<div className={styles.strength}>{card.strength}</div>
		)}
		{children}
		<Features {...card} />
		<div
			className={clsx(
				styles.special,
				isCreatureCard(card) &&
					card.race &&
					styles[`special_${getEnumKeyByValue(CreatureRace, card.race)}`]
			)}
		>
			{isCreatureCard(card)
				? card.race
				: isEquipmentCard(card)
					? card.equipmentType
					: card.subtype}
		</div>
	</div>
);

export default CardContent;
