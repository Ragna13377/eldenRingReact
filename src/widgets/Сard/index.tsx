import React, { useEffect, useRef } from 'react';
import { TCardProps } from '@widgets/Сard/types';
import { useCardDrag } from '@widgets/Сard/hooks';
import { addHoverEffect, removeHoverEffect } from '@shared/utils/utils';
import CardLayout from '@entities/CardLayout';
import CardContent from '@entities/CardContent';
import FlavourText from '@entities/FlavourText';
import CardTitle from '@entities/CardTitle';
import adventuresBackface from '@images/card/card_backface/adventure.webp';
import treasuresBackface from '@images/card/card_backface/treasure.webp';
import layout from '@images/card/cardTemplate.webp';
import styles from './style.module.scss';

const Card = ({ dragHandler, cardKey, card }: TCardProps) => {
	const { type, subtype, title, image } = card;
	const cardRef = useRef<HTMLDivElement>(null);
	const { isDrag, smoothShift } = useCardDrag({
		cardRef,
		subtype,
	});
	useEffect(() => {
		if (isDrag) dragHandler(cardKey);
	}, [isDrag, dragHandler, cardKey]);
	const outsideBorderListener = (e: React.MouseEvent<HTMLDivElement>) => {
		const X = e.clientX;
		const Y = e.clientY;
		const cardRect = cardRef.current?.getBoundingClientRect();
		if (cardRect) {
			if (
				X < cardRect.left ||
				X > cardRect.right ||
				Y < cardRect.top ||
				Y > cardRect.bottom
			) {
				removeHoverEffect<HTMLDivElement>(cardRef, styles.hoverEffect);
				setTimeout(() => {
					addHoverEffect<HTMLDivElement>(cardRef, styles.hoverEffect);
				}, 100);
			}
		}
	};
	return (
		<div
			role='presentation'
			id={cardKey}
			className={styles.hoverEffect}
			ref={cardRef}
			onMouseUp={() =>
				addHoverEffect<HTMLDivElement>(cardRef, styles.hoverEffect)
			}
			onMouseDown={() =>
				removeHoverEffect<HTMLDivElement>(cardRef, styles.hoverEffect)
			}
			onMouseEnter={() =>
				addHoverEffect<HTMLDivElement>(cardRef, styles.hoverEffect)
			}
			onMouseMove={outsideBorderListener}
			style={{
				translate: `${smoothShift.position.x}px ${smoothShift.position.y}px`,
				transition: smoothShift.transition,
			}}
		>
			<article
				className={styles.card}
				style={{
					opacity: isDrag ? 0 : 1,
				}}
			>
				<div className={styles.front}>
					<CardLayout
						image={image}
						title={title}
						layout={layout}
						imageExtraClass={styles.image}
					/>
					<CardContent card={card} extraContentStyle={styles.content}>
						<CardTitle title={title} />
						<FlavourText card={card} />
					</CardContent>
				</div>
				<div
					className={styles.back}
					style={{
						backgroundImage: `url(${type === 'adventures' ? adventuresBackface : treasuresBackface})`,
					}}
				/>
			</article>
		</div>
	);
};
export default Card;
