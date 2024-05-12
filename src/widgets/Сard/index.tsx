import React, { memo, useEffect, useRef } from 'react';
import { TCardWithParams } from '@shared/types/utilityTypes';
import { changeHoverEffect } from '@shared/utils/utils';
import { optimizedOutsideBorderListener } from '@widgets/Сard/utils';
import { useCardDrag } from '@widgets/Сard/hooks';
import { useDispatch } from '@/app/store';
import { setDraggableCard } from '@shared/services/DraggableCard/slice';
import CardLayout from '@entities/CardLayout';
import CardContent from '@entities/CardContent';
import FlavourText from '@entities/FlavourText';
import CardTitle from '@entities/CardTitle';
import adventuresBackface from '@images/card/card_backface/adventure.webp';
import treasuresBackface from '@images/card/card_backface/treasure.webp';
import layout from '@images/card/cardTemplate.webp';
import styles from './style.module.scss';

const Card = ({ card, cardKey }: TCardWithParams) => {
	const dispatch = useDispatch();
	const { type, subtype, title, image } = card;
	const cardRef = useRef<HTMLDivElement>(null);
	const { isDrag, smoothShift } = useCardDrag({
		cardRef,
		subtype,
	});
	useEffect(() => {
		if (isDrag) dispatch(setDraggableCard({ card, cardKey }));
	}, [isDrag, dispatch, card, cardKey]);
	return (
		<div
			role='presentation'
			id={cardKey}
			className={styles.hoverEffect}
			ref={cardRef}
			onMouseUp={() =>
				changeHoverEffect<HTMLDivElement>(cardRef, styles.hoverEffect, 'add')
			}
			onMouseDown={() =>
				changeHoverEffect<HTMLDivElement>(cardRef, styles.hoverEffect, 'remove')
			}
			onMouseEnter={() =>
				changeHoverEffect<HTMLDivElement>(cardRef, styles.hoverEffect, 'add')
			}
			onMouseMove={(e) => optimizedOutsideBorderListener(e, cardRef)}
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

export default memo(Card);
