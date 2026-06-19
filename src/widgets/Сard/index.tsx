import CardContent from '@entities/CardContent';
import CardLayout from '@entities/CardLayout';
import CardTitle from '@entities/CardTitle';
import FlavourText from '@entities/FlavourText';
import adventuresBackface from '@images/card/card_backface/adventure.webp';
import treasuresBackface from '@images/card/card_backface/treasure.webp';
import layout from '@images/card/cardTemplate.webp';
import { setDraggableCard } from '@shared/services/DraggableCard/slice';
import { changeHoverEffect } from '@shared/utils/utils';
import { useCardDrag } from '@widgets/Сard/hooks';
import type { TCardProps } from '@widgets/Сard/types';
import { optimizedOutsideBorderListener } from '@widgets/Сard/utils';
import clsx from 'clsx';
import { memo, useEffect, useRef } from 'react';
import { useDispatch } from '@/app/store';
import styles from './style.module.scss';

const Card = ({ card, cardKey, isActionable, onCardClick }: TCardProps) => {
	const dispatch = useDispatch();
	const { type, subtype, title, image } = card;
	const cardRef = useRef<HTMLButtonElement>(null);
	const { isDrag, smoothShift } = useCardDrag({
		cardRef,
		subtype,
	});
	//TODO вынести в onDragStart?
	useEffect(() => {
		if (isDrag) dispatch(setDraggableCard({ card, cardKey }));
	}, [isDrag, dispatch, card, cardKey]);
	return (
		<button
			type="button"
			id={cardKey}
			className={clsx(styles.hoverEffect, {
				[styles.actionable]: isActionable,
			})}
			ref={cardRef}
			onClick={() => onCardClick?.({ card, cardKey })}
			onMouseUp={() =>
				changeHoverEffect<HTMLButtonElement>(cardRef, styles.hoverEffect, 'add')
			}
			onMouseDown={() =>
				changeHoverEffect<HTMLButtonElement>(cardRef, styles.hoverEffect, 'remove')
			}
			onMouseEnter={() =>
				changeHoverEffect<HTMLButtonElement>(cardRef, styles.hoverEffect, 'add')
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
		</button>
	);
};

export default memo(Card);
