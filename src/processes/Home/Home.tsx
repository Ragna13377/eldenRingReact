import clsx from 'clsx';
import React from 'react';
import Field from '@pages/Field';
import Inventory from '@widgets/Inventory';
import styles from './Home.module.scss';

const Home = () => (
	<main className={styles.main}>
		<aside className={clsx(styles.sidePanel, styles.leftPanel)}>
			<Inventory />
		</aside>
		<Field />
		<aside className={clsx(styles.sidePanel, styles.rightPanel)}>
			<Inventory/>
		</aside>
	</main>
);

export default Home;
