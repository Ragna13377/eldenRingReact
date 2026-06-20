import Field from '@pages/Field';
import type { TChangeModalParams } from '@shared/types/utilityTypes';
import Inventory from '@widgets/Inventory';
import Modal from '@widgets/Modal';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './Game.module.scss';

const Game = () => {
	const [modalParams, setIsModalOpen] = useState<TChangeModalParams>({
		isOpen: false,
		hoveredCard: null,
	});

	return (
		<main className={styles.main}>
			<aside className={clsx(styles.sidePanel, styles.leftPanel)}>
				<Inventory
					ownerId="bot"
					isDropEnabled={false}
					setIsModalOpen={setIsModalOpen}
				/>
			</aside>
			<Field setIsModalOpen={setIsModalOpen} />
			<aside className={clsx(styles.sidePanel, styles.rightPanel)}>
				<Inventory ownerId="human" setIsModalOpen={setIsModalOpen} />
			</aside>
			<Modal {...modalParams} />
		</main>
	);
};

export default Game;
