import clsx from 'clsx';
import Field from '@pages/Field';
import Inventory from '@widgets/Inventory';
import styles from './Game.module.scss';

const Game = () => (
	<main className={styles.main}>
		<aside className={clsx(styles.sidePanel, styles.leftPanel)}>
			<Inventory />
		</aside>
		<Field />
		<aside className={clsx(styles.sidePanel, styles.rightPanel)}>
			<Inventory />
		</aside>
	</main>
);

export default Game;
