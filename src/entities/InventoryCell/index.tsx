import type { TInventoryCellProps } from '@entities/InventoryCell/types';
import { clsx } from 'clsx';
import { memo } from 'react';
import styles from './style.module.scss';

const InventoryCell = ({
	extraClass,
	isAvailable,
	data,
	children,
}: TInventoryCellProps) => (
	<div
		className={clsx(styles.inventoryCell, extraClass, {
			[styles.inventoryCellHover]: isAvailable,
		})}
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
