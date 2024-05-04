import { clsx } from 'clsx';
import React from 'react';
import { TCard } from '@shared/types';
import { isCreatureCard, isWeaponCard } from '@shared/utils/typeGuard';
import styles from './style.module.scss';

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
		case isWeaponCard(card):
			return (
				<div className={styles.features}>
					<div className={clsx(styles.feature, styles.featureHands)}>
						{card.hands}
					</div>
					{card.weight && (
						<div className={clsx(styles.feature, styles.featureWeight)} />
					)}
				</div>
			);
		default:
			return null;
	}
};

export default Features;
