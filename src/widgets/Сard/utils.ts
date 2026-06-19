import type { TInventoryEquipment } from '@shared/types/utilityTypes';
import { changeHoverEffect, throttle } from '@shared/utils/utils';
import styles from '@widgets/Сard/style.module.scss';
import type React from 'react';
import type { RefObject } from 'react';

const outsideBorderListener = (
	e: React.MouseEvent<HTMLElement>,
	cardRef: RefObject<HTMLElement | null>
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
			changeHoverEffect<HTMLElement>(cardRef, styles.hoverEffect, 'remove');
			setTimeout(() => {
				changeHoverEffect<HTMLElement>(cardRef, styles.hoverEffect, 'add');
			}, 100);
		}
	}
};
export const optimizedOutsideBorderListener = throttle(outsideBorderListener, 10);

export const didInventoryUpdated = (inventory: TInventoryEquipment) =>
	Object.values(inventory).some((cell) => cell);
