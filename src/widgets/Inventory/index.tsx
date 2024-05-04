import React, { useEffect, useRef } from 'react';
import { useDropInventory } from '@widgets/Inventory/hooks';
import InventoryCell from '@entities/InventoryCell';
import styles from './style.module.scss';
import { initialAvailableCellState } from '@widgets/Inventory/constants';

const Inventory = () => {
	const inventoryRef = useRef<HTMLDivElement>(null);
	const { availableCell, setAvailableCell, isOver } = useDropInventory({
		inventoryRef,
	});
	useEffect(() => {
		if (!isOver) {
			setAvailableCell(initialAvailableCellState);
		}
	}, [isOver, setAvailableCell]);
	return (
		<article className={styles.inventory} ref={inventoryRef}>
			<InventoryCell
				extraClass={styles.helmet}
				isAvailable={availableCell.helmet}
			/>
			<InventoryCell extraClass={styles.status} />
			<InventoryCell
				extraClass={styles.amulet}
				isAvailable={availableCell.amulet}
			/>
			<InventoryCell
				extraClass={styles.leftWeapon}
				isAvailable={availableCell.leftWeapon}
			/>
			<InventoryCell extraClass={styles.playerClass} />
			<InventoryCell
				extraClass={styles.rightWeapon}
				isAvailable={availableCell.rightWeapon}
			/>
			<InventoryCell
				extraClass={styles.armor}
				isAvailable={availableCell.armor}
			/>
			<InventoryCell extraClass={styles.flavourText} />
			<InventoryCell
				extraClass={styles.boots}
				isAvailable={availableCell.boots}
			/>
		</article>
	);
};

export default Inventory;
