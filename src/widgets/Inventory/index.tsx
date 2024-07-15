import React, { useEffect, useRef } from 'react';
import { useSelector } from '@/app/store';
import { getInventory } from '@shared/services/Inventory/slice';
import { initialAvailableCellState } from '@widgets/Inventory/constants';
import { useDropInventory } from '@widgets/Inventory/hooks';
import { didInventoryUpdated } from '@widgets/Сard/utils';
import InventoryCell from '@entities/InventoryCell';
import styles from './style.module.scss';

const Inventory = () => {
	const inventoryRef = useRef<HTMLDivElement>(null);
	const { score, effect, equipments } = useSelector(getInventory);
	const { availableCell, setAvailableCell, isOver } = useDropInventory({
		inventoryRef,
	});
	useEffect(() => {
		if (!isOver && didInventoryUpdated(availableCell)) {
			setAvailableCell(initialAvailableCellState);
		}
	}, [isOver, availableCell, setAvailableCell]);
	return (
		<article className={styles.inventory} ref={inventoryRef}>
			<InventoryCell
				extraClass={styles.helmet}
				isAvailable={availableCell.helmet}
				data={equipments.helmet}
			/>
			<InventoryCell extraClass={styles.status}>{score}</InventoryCell>
			<InventoryCell
				extraClass={styles.amulet}
				isAvailable={availableCell.amulet}
				data={equipments.amulet}
			/>
			<InventoryCell
				extraClass={styles.leftWeapon}
				isAvailable={availableCell.leftWeapon}
				data={equipments.leftWeapon}
			/>
			<InventoryCell extraClass={styles.playerClass} />
			<InventoryCell
				extraClass={styles.rightWeapon}
				isAvailable={availableCell.rightWeapon}
				data={equipments.rightWeapon}
			/>
			<InventoryCell
				extraClass={styles.armor}
				isAvailable={availableCell.armor}
				data={equipments.armor}
			/>
			<InventoryCell extraClass={styles.flavourText} />
			<InventoryCell
				extraClass={styles.boots}
				isAvailable={availableCell.boots}
				data={equipments.boots}
			/>
		</article>
	);
};

export default Inventory;
