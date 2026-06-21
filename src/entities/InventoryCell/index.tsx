import type { TInventoryCellProps } from '@entities/InventoryCell/types';
import { clsx } from 'clsx';
import { memo } from 'react';
import styles from './style.module.scss';

const InventoryCell = ({
	extraClass,
	isAvailable,
	data,
	ownerId,
	slot,
	isPreviewSuppressed,
	setIsModalOpen,
	children,
}: TInventoryCellProps) => (
	<div
		className={clsx(styles.inventoryCell, extraClass, {
			[styles.inventoryCellHover]: isAvailable,
		})}
		onMouseEnter={() => {
			if (data && !isPreviewSuppressed) {
				setIsModalOpen?.({ isOpen: true, hoveredCard: data });
			}
		}}
		onMouseLeave={() => {
			if (data) setIsModalOpen?.({ isOpen: false, hoveredCard: null });
		}}
		onContextMenu={(event) => {
			event.preventDefault();
			if (!data || !ownerId || !slot) return;

			setIsModalOpen?.({ isOpen: false, hoveredCard: null });
			window.dispatchEvent(
				new CustomEvent('inventory-card-unequip-requested', {
					detail: {
						card: data,
						ownerId,
						slot,
					},
				})
			);
		}}
	>
		{data && (
			<img
				className={styles.inventoryCellImage}
				src={data.card.image}
				alt={data.card.title}
			/>
		)}
		{children}
	</div>
);

export default memo(InventoryCell);
