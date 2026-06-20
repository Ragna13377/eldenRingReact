import InventoryCell from '@entities/InventoryCell';
import { getInventoryByOwner } from '@shared/services/Inventory/slice';
import { initialAvailableCellState } from '@widgets/Inventory/constants';
import { useDropInventory } from '@widgets/Inventory/hooks';
import type { TInventoryProps } from '@widgets/Inventory/types';
import { didInventoryUpdated } from '@widgets/Сard/utils';
import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from '@/app/store';
import styles from './style.module.scss';

const Inventory = ({ ownerId, isDropEnabled = true, setIsModalOpen }: TInventoryProps) => {
	const inventoryRef = useRef<HTMLDivElement>(null);
	const { score, equipments } = useSelector((state) => getInventoryByOwner(state, ownerId));
	const { availableCell, setAvailableCell, isOver, setNodeRef } = useDropInventory({
		inventoryRef,
		ownerId,
		isDropEnabled,
	});
	const setInventoryRef = useCallback(
		(node: HTMLDivElement | null) => {
			inventoryRef.current = node;
			setNodeRef(node);
		},
		[setNodeRef]
	);
	useEffect(() => {
		if (!isOver && didInventoryUpdated(availableCell)) {
			setAvailableCell(initialAvailableCellState);
		}
	}, [isOver, availableCell, setAvailableCell]);
	return (
		<article className={styles.inventory} ref={setInventoryRef}>
			<InventoryCell
				extraClass={styles.helmet}
				isAvailable={availableCell.helmet}
				data={equipments.helmet}
				setIsModalOpen={setIsModalOpen}
			/>
			<InventoryCell extraClass={styles.status}>{score}</InventoryCell>
			<InventoryCell
				extraClass={styles.amulet}
				isAvailable={availableCell.amulet}
				data={equipments.amulet}
				setIsModalOpen={setIsModalOpen}
			/>
			<InventoryCell
				extraClass={styles.leftWeapon}
				isAvailable={availableCell.leftWeapon}
				data={equipments.leftWeapon}
				setIsModalOpen={setIsModalOpen}
			/>
			<InventoryCell extraClass={styles.playerClass} />
			<InventoryCell
				extraClass={styles.rightWeapon}
				isAvailable={availableCell.rightWeapon}
				data={equipments.rightWeapon}
				setIsModalOpen={setIsModalOpen}
			/>
			<InventoryCell
				extraClass={styles.armor}
				isAvailable={availableCell.armor}
				data={equipments.armor}
				setIsModalOpen={setIsModalOpen}
			/>
			<InventoryCell extraClass={styles.flavourText} />
			<InventoryCell
				extraClass={styles.boots}
				isAvailable={availableCell.boots}
				data={equipments.boots}
				setIsModalOpen={setIsModalOpen}
			/>
		</article>
	);
};

export default Inventory;
