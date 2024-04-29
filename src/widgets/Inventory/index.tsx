import clsx from 'clsx';
import React from 'react';
import styles from './style.module.scss'
import InventoryCell from '@entities/InventoryCell';

const Inventory = () => {
	return (
		<article className={styles.inventory}>
			<InventoryCell extraClass={styles.helmet} />
			<InventoryCell extraClass={styles.status} />
			<InventoryCell extraClass={styles.amulet} />
			<InventoryCell extraClass={styles.leftWeapon} />
			<InventoryCell extraClass={styles.playerClass} />
			<InventoryCell extraClass={styles.rightWeapon} />
			<InventoryCell extraClass={styles.armor} />
			<InventoryCell extraClass={styles.flavourText} />
			<InventoryCell extraClass={styles.boots} />
		</article>
	);
};

export default Inventory;