import { clsx } from 'clsx';
import React from 'react';
import { TInventoryCellProps } from '@entities/InventoryCell/types';
import styles from './style.module.scss';

const InventoryCell = ({ extraClass, isAvailable }: TInventoryCellProps) => (
	<div
		className={clsx(styles.inventoryCell, extraClass, {
			[styles.inventoryCellHover]: isAvailable,
		})}
	/>
);

export default InventoryCell;
