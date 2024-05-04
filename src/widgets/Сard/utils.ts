import React, { RefObject } from 'react';
import {
	addHoverEffect,
	removeHoverEffect,
	throttle,
} from '@shared/utils/utils';
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
			removeHoverEffect<HTMLDivElement>(cardRef, styles.hoverEffect);
			setTimeout(() => {
				addHoverEffect<HTMLDivElement>(cardRef, styles.hoverEffect);
			}, 100);
		}
	}
};
export const optimizedOutsideBorderListener = throttle(
	outsideBorderListener,
	10
);
