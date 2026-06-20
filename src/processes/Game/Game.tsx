import Field from '@pages/Field';
import Inventory from '@widgets/Inventory';
import clsx from 'clsx';
import styles from './Game.module.scss';

const Game = () => {
	return (
		<main className={styles.main}>
			<aside className={clsx(styles.sidePanel, styles.leftPanel)}>
				<Inventory ownerId="bot" isDropEnabled={false} />
			</aside>
			<Field />
			<aside className={clsx(styles.sidePanel, styles.rightPanel)}>
				<Inventory ownerId="human" />
			</aside>
		</main>
	);
};

export default Game;
