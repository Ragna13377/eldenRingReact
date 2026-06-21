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
	const previewSuppressedCardKeyRef = useRef<string | null>(null);
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

	useEffect(() => {
		const handleInventoryCardEquipped = (event: Event) => {
			const { ownerId: equippedOwnerId, equippedCard } = (
				event as CustomEvent<{
					equippedCard: { cardKey: string };
					ownerId: typeof ownerId;
				}>
			).detail;

			if (equippedOwnerId !== ownerId) return;

			previewSuppressedCardKeyRef.current = equippedCard.cardKey;
			setIsModalOpen?.({ isOpen: false, hoveredCard: null });

			window.setTimeout(() => {
				if (previewSuppressedCardKeyRef.current === equippedCard.cardKey) {
					previewSuppressedCardKeyRef.current = null;
				}
			}, 500);
		};

		window.addEventListener('inventory-card-equipped', handleInventoryCardEquipped);

		return () => {
			window.removeEventListener('inventory-card-equipped', handleInventoryCardEquipped);
		};
	}, [ownerId, setIsModalOpen]);

	const isPreviewSuppressed = useCallback(
		(cardKey?: string) => previewSuppressedCardKeyRef.current === cardKey,
		[]
	);

	return (
		<article className={styles.inventory} ref={setInventoryRef}>
			<InventoryCell
				extraClass={styles.helmet}
				isAvailable={availableCell.helmet}
				data={equipments.helmet}
				ownerId={ownerId}
				slot="helmet"
				isPreviewSuppressed={isPreviewSuppressed(equipments.helmet?.cardKey)}
				setIsModalOpen={setIsModalOpen}
			/>
			<InventoryCell extraClass={styles.status}>{score}</InventoryCell>
			<InventoryCell
				extraClass={styles.amulet}
				isAvailable={availableCell.amulet}
				data={equipments.amulet}
				ownerId={ownerId}
				slot="amulet"
				isPreviewSuppressed={isPreviewSuppressed(equipments.amulet?.cardKey)}
				setIsModalOpen={setIsModalOpen}
			/>
			<InventoryCell
				extraClass={styles.leftWeapon}
				isAvailable={availableCell.leftWeapon}
				data={equipments.leftWeapon}
				ownerId={ownerId}
				slot="leftWeapon"
				isPreviewSuppressed={isPreviewSuppressed(equipments.leftWeapon?.cardKey)}
				setIsModalOpen={setIsModalOpen}
			/>
			<InventoryCell extraClass={styles.playerClass} />
			<InventoryCell
				extraClass={styles.rightWeapon}
				isAvailable={availableCell.rightWeapon}
				data={equipments.rightWeapon}
				ownerId={ownerId}
				slot="rightWeapon"
				isPreviewSuppressed={isPreviewSuppressed(equipments.rightWeapon?.cardKey)}
				setIsModalOpen={setIsModalOpen}
			/>
			<InventoryCell
				extraClass={styles.armor}
				isAvailable={availableCell.armor}
				data={equipments.armor}
				ownerId={ownerId}
				slot="armor"
				isPreviewSuppressed={isPreviewSuppressed(equipments.armor?.cardKey)}
				setIsModalOpen={setIsModalOpen}
			/>
			<InventoryCell extraClass={styles.flavourText} />
			<InventoryCell
				extraClass={styles.boots}
				isAvailable={availableCell.boots}
				data={equipments.boots}
				ownerId={ownerId}
				slot="boots"
				isPreviewSuppressed={isPreviewSuppressed(equipments.boots?.cardKey)}
				setIsModalOpen={setIsModalOpen}
			/>
		</article>
	);
};

export default Inventory;
