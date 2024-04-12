import styles from './Field.module.scss';
import Card from '@widgets/Сard/Сard';
import { creatures } from '@shared/storage/creatures';
import field from '@shared/assets/images/field.webp';
import clsx from 'clsx';
import {DndProvider, useDrop} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {cardSubType} from '@shared/types';

const Field = () => {
	// const [] = useDrop(() => {
	// 	accept: cardSubType.creature
	// })
	return (
		<DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
			<div className={styles.fieldContainer}>
				<img className={styles.fieldLayout} src={field} alt='Игровое поле' />
				<div className={styles.field}>
					<div className={clsx(styles.hand, styles.enemyHand)} />
					<div className={styles.arena}>
						<div className={styles.enemyArena} />
						<div className={styles.playerArena} />
					</div>
					<div className={clsx(styles.hand, styles.playerHand)}>
						{creatures.map((card, index) => {
							if (index > 30 && index < 36)
								return <Card {...card} key={card.title} />;
						})}
					</div>
				</div>
			</div>
		</DndProvider>
	);
};

export default Field;
