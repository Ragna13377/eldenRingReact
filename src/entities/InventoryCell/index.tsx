import { clsx } from 'clsx';
import { memo } from 'react';
import { TInventoryCellProps } from '@entities/InventoryCell/types';
import styles from './style.module.scss';

const InventoryCell = ({
	extraClass,
	isAvailable,
	data,
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
	</div>
);

export default memo(InventoryCell);
