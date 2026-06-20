import CardContent from '@entities/CardContent';
import CardLayout from '@entities/CardLayout';
import CardTitle from '@entities/CardTitle';
import FlavourText from '@entities/FlavourText';
import adventuresBackface from '@images/card/card_backface/adventure.webp';
import treasuresBackface from '@images/card/card_backface/treasure.webp';
import layout from '@images/card/cardTemplate.webp';
import type { TCardWithParams } from '@shared/types/utilityTypes';
import styles from './style.module.scss';

type TCardViewProps = TCardWithParams & {
	isHidden?: boolean;
};

const CardView = ({ card, isHidden }: TCardViewProps) => {
	const { type, title, image } = card;

	return (
		<article
			className={styles.card}
			style={{
				visibility: isHidden ? 'hidden' : 'visible',
			}}
		>
			<div className={styles.front}>
				<CardLayout image={image} title={title} layout={layout} imageExtraClass={styles.image} />
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
};

export default CardView;
