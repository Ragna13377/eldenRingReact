import React from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';
import { TInventoryCellProps } from '@entities/InventoryCell/types';

const InventoryCell = ({ extraClass }: TInventoryCellProps) => (
	<div className={clsx(styles.inventoryCell, extraClass)} />
);

export default InventoryCell;
