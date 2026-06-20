import CardContent from '@entities/CardContent';
import CardLayout from '@entities/CardLayout';
import CardTitle from '@entities/CardTitle';
import FlavourText from '@entities/FlavourText';
import adventuresBackface from '@images/card/card_backface/adventure.webp';
import treasuresBackface from '@images/card/card_backface/treasure.webp';
import layout from '@images/card/cardTemplate.webp';
import { clearDraggableCard, setDraggableCard } from '@shared/services/DraggableCard/slice';
import { useCardDrag } from '@widgets/Сard/hooks';
import type { TCardProps } from '@widgets/Сard/types';
import clsx from 'clsx';
import { memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from '@/app/store';
import styles from './style.module.scss';

const Card = ({ card, cardKey, isActionable, onCardClick }: TCardProps) => {
	const dispatch = useDispatch();
	const { type, subtype, title, image } = card;
	const cardRef = useRef<HTMLButtonElement>(null);
	const { isDrag, dragClientOffset, smoothShift } = useCardDrag({
		cardRef,
		subtype,
		cardKey,
	});
	//TODO вынести в onDragStart?
	useEffect(() => {
		if (isDrag) dispatch(setDraggableCard({ card, cardKey }));
		return () => {
			if (isDrag) dispatch(clearDraggableCard());
		};
	}, [isDrag, dispatch, card, cardKey]);
	const cardContent = (
		<article
			className={styles.card}
			style={{
				visibility: isDrag ? 'hidden' : 'visible',
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
	);
	return (
		<>
			<button
				type="button"
				id={cardKey}
				className={clsx(styles.hoverEffect, {
					[styles.actionable]: isActionable,
				})}
				ref={cardRef}
				onClick={() => onCardClick?.({ card, cardKey })}
				style={{
					translate: `${smoothShift.position.x}px ${smoothShift.position.y}px`,
					transition: smoothShift.transition,
				}}
			>
				{cardContent}
			</button>
			{isDrag &&
				dragClientOffset &&
				createPortal(
					<div
						style={{
							position: 'fixed',
							left: dragClientOffset.x,
							top: dragClientOffset.y,
							zIndex: 2147483647,
							pointerEvents: 'none',
							transform: 'translate(-50%, -50%)',
						}}
					>
						<article className={styles.card}>
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
					</div>,
					document.body
				)}
		</>
	);
};

export default memo(Card);
