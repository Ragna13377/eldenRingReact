import type { TInventoryCellProps } from '@entities/InventoryCell/types';
import { clsx } from 'clsx';
import { memo } from 'react';
import styles from './style.module.scss';

const InventoryCell = ({
	extraClass,
	isAvailable,
	data,
	setIsModalOpen,
	children,
}: TInventoryCellProps) => (
	<div
		className={clsx(styles.inventoryCell, extraClass, {
			[styles.inventoryCellHover]: isAvailable,
		})}
		onMouseEnter={() => {
			if (data) setIsModalOpen?.({ isOpen: true, hoveredCard: data });
		}}
		onMouseLeave={() => {
			if (data) setIsModalOpen?.({ isOpen: false, hoveredCard: null });
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
