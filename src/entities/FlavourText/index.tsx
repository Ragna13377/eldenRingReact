import { useEffect, useRef, useState } from 'react';
import { TCard } from '@shared/types';
import { isCreatureCard } from '@shared/utils/typeGuard';
import { AbilityAction, PunishmentAction } from '@shared/utils/effects';
import { maxLineLength } from '@widgets/Сard/constants';
import {
	baseFontSize,
	compressedFontSize,
} from '@entities/FlavourText/constants';
import styles from './style.module.scss';

const FlavourText = ({ card }: { card: TCard }) => {
	const fontRef = useRef<HTMLDivElement>(null);
	const [fontSize, setFontSize] = useState(baseFontSize);
	useEffect(() => {
		if (!fontRef.current) return;
		if (
			fontRef.current.textContent &&
			fontRef.current.textContent?.length > maxLineLength
		)
			setFontSize(compressedFontSize);
	}, []);
	return (
		<div
			className={styles.flavour_text}
			ref={fontRef}
			style={{ fontSize: `${fontSize}px` }}
		>
			{isCreatureCard(card) && (
				<>
					{card.ability && (
						<div className={styles.ability}>
							<span className={styles.flavourText_title}>Способность: </span>
							{card.ability.map((a) => AbilityAction[a.type].getDescription(a))}
						</div>
					)}
					{card.punishment && (
						<div className={styles.punishment}>
							<span className={styles.flavourText_title}>Наказание: </span>
							{card.punishment.map((p) =>
								PunishmentAction[p.type].getDescription(p)
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default FlavourText;
