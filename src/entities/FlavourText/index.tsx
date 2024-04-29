import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { isCreatureCard } from '@shared/utils/typeGuard';
import { AbilityAction, PunishmentAction } from '@shared/utils/effects';
import { maxLineLength } from '@widgets/Сard/constants';
import { TFlavourTextProps } from '@entities/FlavourText/types';
import styles from './style.module.scss';


const FlavourText = ({ card, fontExtraClass }: TFlavourTextProps) => {
	const fontRef = useRef<HTMLDivElement>(null);
	const [isCompressed, setIsCompressed] = useState(false);
	useEffect(() => {
		if (!fontRef.current) return;
		if (
			fontRef.current.textContent &&
			fontRef.current.textContent?.length > maxLineLength
		)
			setIsCompressed(true);
	}, []);
	return (
		<div
			className={clsx(styles.flavourText, isCompressed ? styles.compressedFont : styles.baseFont, fontExtraClass)}
			ref={fontRef}
		>
			{isCreatureCard(card) && (
				<>
					{card.ability && (
						<p className={styles.ability}>
							<span className={styles.flavourText_title}>Способность: </span>
							{card.ability.map((a) => AbilityAction[a.type].getDescription(a))}
						</p>
					)}
					{card.punishment && (
						<p className={styles.punishment}>
							<span className={styles.flavourText_title}>Наказание: </span>
							{card.punishment.map((p) =>
								PunishmentAction[p.type].getDescription(p)
							)}
						</p>
					)}
				</>
			)}
		</div>
	);
};

export default FlavourText;
