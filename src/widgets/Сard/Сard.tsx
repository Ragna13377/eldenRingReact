import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './Сard.module.scss';
import layout from '@images/card/cardTemplate.webp';
import adventuresBackface from '@images/card/card_backface/adventure.webp';
import treasuresBackface from '@images/card/card_backface/treasure.webp';
import { creatureRace, TCard } from '@shared/types';
import { isCreatureCard } from '@shared/utils/typeGuard';
import clsx from 'clsx';
import Features from '@entities/Features/Features';
import { AbilityAction, PunishmentAction } from '@shared/utils/effects';
import { useDrag } from 'react-dnd';

const Card = (card: TCard) => {
	const { type, title, image } = card;
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [transition, setTransition] = useState('none')
	const [{ isDragging }, drag, dragPreview] = useDrag({
		type: card.type,
		item: { id: title },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		end: (item, monitor) => {
			const differenceFromInitialOffset =
				monitor.getDifferenceFromInitialOffset();
			setTransition('none');
			setPosition({
				...position,
				x: differenceFromInitialOffset?.x || 0,
				y: differenceFromInitialOffset?.y || 0,
			});
			setTimeout(() => {
				setTransition('translate 0.5s ease');
				setPosition({
					...position,
					x: 0,
					y: 0,
				});
			}, 5)
		},
	});
	const fontRef = useRef<HTMLDivElement>(null);
	const [fontSize, setFontSize] = useState(6);
	useLayoutEffect(() => {
		if (!fontRef.current) return;
		if (
			fontRef.current.textContent &&
			fontRef.current.textContent?.length > 110
		)
			setFontSize(5.5);
	}, []);
	return (
		<article
			id={title}
			className={clsx(styles.card, {[styles.card_hover]: !isDragging})}
			ref={drag}
			style={{
				opacity: isDragging ? 0 : 1,
				// translate: `${position.x}px ${position.y}px`,
				// transition,
			}}
		>
			<div className={styles.front}>
				<img className={styles.layout} src={layout} alt='' />
				<img className={styles.image} src={image} alt={title} />
				<div className={styles.content}>
					<div
						className={clsx(styles.title, {
							[styles.titleCompressed]: title.length > 24,
						})}
					>
						{card.title}
						{isCreatureCard(card) && (
							<div className={styles.strength}>{card.strength}</div>
						)}
					</div>
					<div
						className={styles.flavour_text}
						ref={fontRef}
						style={{ fontSize: `${fontSize}px` }}
					>
						{isCreatureCard(card) && (
							<>
								{card.ability && (
									<div className={styles.ability}>
										<span className={styles.flavourText_title}>
											Способность:{' '}
										</span>
										{card.ability.map((a) =>
											AbilityAction[a.type].getDescription(a)
										)}
									</div>
								)}
								{card.punishment && (
									<div className={styles.punishment}>
										<span className={styles.flavourText_title}>
											Наказание:{' '}
										</span>
										{card.punishment.map((p) =>
											PunishmentAction[p.type].getDescription(p)
										)}
									</div>
								)}
							</>
						)}
					</div>
					<Features {...card} />
					<div
						className={clsx(styles.special, {
							[styles.special_beast]:
								isCreatureCard(card) && card.race === creatureRace.beast,
							[styles.special_plant]:
								isCreatureCard(card) && card.race === creatureRace.plant,
							[styles.special_magical]:
								isCreatureCard(card) && card.race === creatureRace.magical,
							[styles.special_undead]:
								isCreatureCard(card) && card.race === creatureRace.undead,
						})}
					>
						{isCreatureCard(card) ? card.race : card.subtype}
					</div>
				</div>
			</div>
			<div className={styles.back}>
				<img
					className={styles.backface}
					src={type === 'adventures' ? adventuresBackface : treasuresBackface}
					alt='Рубашка карты'
				/>
			</div>
		</article>
	);
};
export default Card;
