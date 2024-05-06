import { TMiniCardProps } from '@widgets/MiniCard/types';
import CardLayout from '@entities/CardLayout';
import CardContent from '@entities/CardContent';
import layout from '@images/card/baseCardTemplate.webp';
import styles from '@widgets/MiniCard/style.module.scss';
import { memo } from 'react';

const MiniCard = ({ card, cardKey, setIsModalOpen }: TMiniCardProps) => {
	const { title, image } = card;
	return (
		<article
			className={styles.card}
			onMouseEnter={() =>
				setIsModalOpen({ isOpen: true, hoveredCardKey: cardKey })
			}
			onMouseLeave={() => setIsModalOpen({ isOpen: false, hoveredCardKey: '' })}
		>
			<CardLayout
				image={image}
				title={title}
				layout={layout}
				imageExtraClass={styles.image}
			/>
			<CardContent card={card} extraContentStyle={styles.content} />
		</article>
	);
};

export default memo(MiniCard);
