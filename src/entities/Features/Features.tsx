import React from 'react';
import styles from './Features.module.scss';
import { TCard } from '@shared/types';
import { isCreatureCard, isEquipmentCard } from '@shared/utils/typeGuard';
import clsx from 'clsx';

const Features = (card: TCard) => {
	switch (true) {
		case isCreatureCard(card):
			return (
				<div className={styles.features}>
					<div className={clsx(styles.feature, styles.featureLevel)}>
						{card.level}
					</div>
					<div className={clsx(styles.feature, styles.featureLoot)}>
						{card.loot}
					</div>
				</div>
			);
		case isEquipmentCard(card):
			return (
				<div className={styles.features}>
					<div className={clsx(styles.feature, styles.featureHands)}>
						{card.weight}
					</div>
					<div className={clsx(styles.feature, styles.featureWeight)}>
						{card.weight}
					</div>
				</div>
			);
		default:
			return null;
	}
};

export default Features;
