import CardView from '@widgets/Сard/CardView';
import { useCardDrag } from '@widgets/Сard/hooks';
import type { TCardProps } from '@widgets/Сard/types';
import clsx from 'clsx';
import { memo } from 'react';
import styles from './style.module.scss';

const Card = ({ card, cardKey, isActionable, onCardClick }: TCardProps) => {
	const { attributes, isDragging, listeners, setNodeRef } = useCardDrag({
		card: { card, cardKey },
		cardKey,
	});

	return (
		<button
			type="button"
			id={cardKey}
			className={clsx(styles.hoverEffect, {
				[styles.actionable]: isActionable,
			})}
			ref={setNodeRef}
			onClick={() => onCardClick?.({ card, cardKey })}
			{...listeners}
			{...attributes}
		>
			<CardView card={card} cardKey={cardKey} isHidden={isDragging} />
		</button>
	);
};

export default memo(Card);
