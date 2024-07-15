import React, { RefObject } from 'react';
import { changeHoverEffect, throttle } from '@shared/utils/utils';
import { TInventoryEquipment } from '@shared/types/utilityTypes';
import styles from '@widgets/Сard/style.module.scss';

const outsideBorderListener = (
	e: React.MouseEvent<HTMLDivElement>,
	cardRef: RefObject<HTMLDivElement>
) => {
	const X = e.clientX;
	const Y = e.clientY;
	const cardRect = cardRef.current?.getBoundingClientRect();
	if (cardRect) {
		if (
			X < cardRect.left ||
			X > cardRect.right ||
			Y < cardRect.top ||
			Y > cardRect.bottom
		) {
			changeHoverEffect<HTMLDivElement>(cardRef, styles.hoverEffect, 'remove');
			setTimeout(() => {
				changeHoverEffect<HTMLDivElement>(cardRef, styles.hoverEffect, 'add');
			}, 100);
		}
	}
};
export const optimizedOutsideBorderListener = throttle(
	outsideBorderListener,
	10
);

export const didInventoryUpdated = (inventory: TInventoryEquipment) =>
	Object.values(inventory).some((cell) => cell);
